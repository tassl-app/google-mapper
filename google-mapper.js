function googleMapper(place) {
	loc = {
		"google_id": place["place_id"],
		"name": place["formatted_address"],
		"latitude": place["geometry"]["location"].lat(),
		"longitude": place["geometry"]["location"].lng()
	};

	mapper = {
		"street_number": {
			"detail": "short_name",
			"field": "address_one"
		},
		"route": {
			"detail": "long_name",
			"field": "address_two"
		},
		"locality": {
			"detail": "long_name",
			"field": "city"
		},
		"administrative_area_level_1": {
			"detail": "short_name",
			"field": "state"
		},
		"country": {
			"detail": "short_name",
			"field": "country"
		},
		"postal_code": {
			"detail": "long_name",
			"field": "zipcode"
		}
	}

	for (var i = 0; i < place.address_components.length; i++) {
		var addressType = place.address_components[i].types[0];
		if (mapper[addressType]) {
			var mapped = mapper[addressType];
			var detail = mapped["detail"];
			var field = mapped["field"];
			var val = place.address_components[i][detail];
			loc[field] = val;
		}
	}

	return loc;
}