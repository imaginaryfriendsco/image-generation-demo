source_images = "/Users/Gary/generated-images/"

destination_images = "/Users/Gary/friends/"

friend_metadata = []


count = 0

for f in os.listdir(source_images):
	if f.startswith("."):
		continue

	friend_name = "friend_" + str(count) + ".png"
	friend = {"image": friend_name}

	filename = os.path.basename(f)
	filename_without_ext = filename.split(".")[0]
	file_split = filename_without_ext.split("+")

	# Splitting the filename by '+' to extract metadata
	# This is why file naming convention is important
	try:
		attributes = []
		attributes.append({"trait_type": "Glasses", "value": file_split[0]})
		attributes.append({"trait_type": "Body accessory", "value": file_split[1]})
		attributes.append({"trait_type": "Background", "value": file_split[2]})
	except Exception as e:
		print(str(e) + ": " + filename)

	friend["attributes"] = attributes
	friend_metadata.append(friend)

	shutil.copyfile(source_images + filename, destination_images + friend_name)
	count += 1

friends = {"friends": friend_metadata}

with open("/Users/Gary/friends/metadata.json", "w") as outfile:
	json.dump(friends, outfile)
