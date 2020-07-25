# Octicons Sprite File

This repo contains a [SVG sprite version](./octicons-sprite.svg) of the [Octicons](https://primer.style/octicons/)
(v.10.0.0) generated with the provided `svg-sprite-maker.js` NodeJS script.

## Using the sprite file

Declare a `<svg>` tag and simply `<use>` the desired icon. For example, using the
"project-24" icon is achieved with the following:

```html
<svg>
  <use xlink:href="octicons-sprite.svg#project-24"></use>
</svg>
```

Note that most browsers block cross-origin requests for the `<use>` tag, so you
should probably host your own copy of the sprite file.

## Generating another sprite file

Use the provided `svg-sprite-maker.js`:

```
node ./svg-sprite-maker.js /path/to/svg/directory > output-sprite.svg
```
