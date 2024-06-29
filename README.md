<h1 align="center">Pix</h1>
<p align="center">Generate placeholder images on the fly</p>

## Usage

Clone to local:
```sh
$ npx degit NicolaSpadari/pix my-pix-app
```

Install dependencies:
```sh
$ pnpm install
```

Run project:
```sh
$ pnpm run dev
```

Generate image:

- Visit `https://mywebsite.com/<width>x<height>?text=SomeText`
- Text is optional
- Height can be omitted
- By default if not parameters are provided, default width and height is 500
