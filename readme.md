With Random Avatar API you can get a random avatar image from different resources and various sizes with a simple api call

## Usage

### Get available resources

```bash
https://api.random-avatars.holmista.tech/resource/available-resources
```

this will return a json array with all available resources

### Get random avatar

```bash
https://api.random-avatars.holmista.tech/images/random/small
```

this will return a random avatar image from all available resources in small size

### Get random avatar from specific resource

```bash
https://api.random-avatars.holmista.tech/images/jojo/random/medium
```

this will return a random avatar link (not image) from jojo resource in medium size

### Create your own resource

to create your own resource, it should not already exist, also you need to upload exactly 10 images. The images will be reviewed and if they are good, they will be added to the api. Send post request to this endpoint

```bash
https://api.random-avatars.holmista.tech/images/
```

the post request should contail resource and images in form data.
<br>You can also go to the [website](https://random-avatars.holmista.tech) and create your own resource from there.
