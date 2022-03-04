#target illustrator

// The layer(s) that will be consistent across all images
const immutables = ["body"];


// Glasses
function chooseGlasses() {
	const index = getRandomIndex(glassesLayer);
	const element = glassesLayer[index];
	if(element == "none") {
		return index;
	}
	else {
		groups[element].hidden = false;
		return index;
	}
}

const glassesLayer = ["3D", "clout", "shuttershades", "none"]



// Body accessory
function chooseBodyAccessory() {
	const index = getRandomIndex(bodyAccessoryLayer);
	const element = bodyAccessoryLayer[index];
	if(element == "none") {
		return index;
	}
	else {
		groups[element].hidden = false;
		return index;
	}
}

// There are a lot of different ways to implement rarity
// One simple solution is to leverage how the random function works so that in this case,
// fanny pack is less likely to get chosen
const bodyAccessoryLayer = ["fanny-pack", "none", "none", "none", "none", "none", "none"]


// Background
function chooseBackground() {
	const index = getRandomIndex(backgroundLayer);
	const element = backgroundLayer[index];
	groups[element].hidden = false;
	return index;
}

const backgroundLayer = ["green", "blue"]

// Top layer
const friendLayer = app.activeDocument.layers.getByName("Friend");

const groups = friendLayer.groupItems;

var hashes = [];

hideAll();
generateImages();


function generateImages() {
	var generatedImage = generateSingleImage();
	var hash = generatedImage[0]
	for(var i = 0; i < 100; i++) { // Adjust this number accordingly based on # of images
		while(contains(hashes, hash)) { // Logic to guarantee uniqueness 
			generatedImage = generateSingleImage();
			hash = generatedImage[0]
		}
		saveAsPNG(generatedImage[1]);
		hashes.push(hash)
	}
}

function generateSingleImage() {
	hideAll();

	const glasses = chooseGlasses();
	const bodyAccessory = chooseBodyAccessory();
	const background = chooseBackground();

	const imageHash = glasses.toString() + "+" + bodyAccessory.toString() + "+" background.toString()


	// Naming convention will be important for generating metadata
	const imageName = glassesLayer[glasses] + "+" + bodyAccessoryLayer[bodyAccessory] + "+" + backgroundLayer[background]

	return [imageHash, imageName];
}

function getRandomIndex(array) {
	return Math.floor(Math.random()*array.length)
}

function hideAll() {
	for(var i = 0; i < groups.length; i++) {
		item = groups[i]
		if(!contains(immutables, item.name))
			item.hidden = true;
	}
}

function saveAsPNG(name) {
	var fileName = '/Users/Gary/generated-images/' + name + '.png';

    var pngFile = new File(fileName);
    try {
        app.activeDocument.imageCapture(pngFile);
    } catch (e) {
    }
}

// Not sure what version of JS they are using but 
// it can barely be called JS if I had to write this function myself 
// (not efficient but it works)
function contains(array, value) {
	for(var i = 0; i < array.length; i++) {
		if(array[i] == value) {
			return true;
		}
	}
	return false;
}
