const TreeMaker = require("@corbin-c/minimal-server/tree.js");
const cheerio = require("cheerio");
const fs = require("fs");

const relevantAttributes = ["height","width","viewBox"];

(async () => {
  let list = [];
  try {
    let svgDirectory = (process.argv[2].split("").reverse()[0] == "/")
      ? process.argv[2].slice(0,-1)
      : process.argv[2];
    list = TreeMaker(svgDirectory).list
      .map(filename => svgDirectory+filename.slice(1))
      .filter(filename => {
        return filename.split(".").reverse()[0] == "svg";
      });
  } catch {
    console.error("Usage: node svg-sprite-maker.js /path/to/svg/directory");
    process.exit();
  }
  if (list.length > 0) {
    let output = `<?xml version="1.0" encoding="utf-8"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">`
    await Promise.all(list.map(async filename => {
      let svg = fs.readFileSync(filename,"utf8");
      svg = cheerio.load(svg);
      let content = svg("svg").html();
      let attr = svg("svg").attr();
      let out = [];
      Object.keys(attr).map(e => {
        if (relevantAttributes.indexOf(e) >= 0) {
          out.push(e+"='"+attr[e]+"'");
        }
      });
      out.push("id='"+filename.split("/").reverse()[0].split(".").slice(0,-1).join("-")+"'");
      out = "<symbol "+out.join(" ")+">"+content+"</symbol>";
      output += out;
    }));
    output += "</svg>";
    console.log(output);
  }
  process.exit();
})();
