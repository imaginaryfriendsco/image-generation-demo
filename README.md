# image-generation-demo

This repo contains two scripts:
1) generate-images.js -  JS code that can be run in Adobe Illustrator to generate unique images 
2) generate-metadata.py - Python code that will generate metadata for the images


## Image generation
To run the script in Illustrator, go to `File -> Scripts -> Other script` and choose `generate-images.js` 

Though we used Illustrator for our purposes, there are other Adobe products that allow for running JS scripts within the program. For instance, we could write a script with similar logic and run it in After Effects. It'd be cool to see some more animation NFTs :)

### Attributes
In the script, we demo three different attributes: `glasses`, `body accessory`, and `background`. 

Let's take a look at the glasses, defined in the script as:

`const glassesLayer = ["3D", "clout", "shuttershades", "none"]`

The first three in the array `"3D", "clout", "shuttershades"` should match up with the layers in Illustrator (make sure the names match up exactly!)

<img width="294" alt="Screen Shot 2022-03-03 at 9 36 52 PM" src="https://user-images.githubusercontent.com/94145604/156689650-9099814f-325b-4c48-94b0-7d747139adbf.png">

Note that the last element in the array `"none"` does not correspond to a layer name. The code dictates that if we choose `"none"` (via a random function), we will generate an image without any glasses.

### Uniqueness 
Each image is represented by randomly combined attributes. An image only gets created if none of the other previously created images have that combination of attributes, guaranteeing its uniqueness. 

### File naming
The images files are named by concatenating all of the image's attributes. For instance, an image containing shuttershades, a fanny pack, and a blue background would be saved as `shuttershades+fanny-pack+blue.png`. This naming convention will be important when we generate the metadata.

## Metadata generation
Assuming these images will be used for NFTs, we will also need to generate the metadata for them. More info about metadata standards can be found [here](https://docs.opensea.io/docs/metadata-standards).

The Python script loops through all of the generated images, extracts the attributes from the filenames, and dumps the data into a JSON file that can then be used as the NFT metadata. 

Going back to the glasses attribute example, we would write `attributes.append({"trait_type": "Glasses", "value": file_split[0]})`

##
Feel free to adapt this code for your use case. If you have any questions, reach out to us on [Discord](https://discord.com/invite/QJRQYpP6jc)!
