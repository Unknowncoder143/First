// Define custom icons
const customIcon1 = L.icon({
  iconUrl: 'path_to_icon1.png',
  iconSize: [32, 32], // size of the icon
});

const customIcon2 = L.icon({
  iconUrl: 'path_to_icon2.png',
  iconSize: [32, 32],
});

// Fetch the JSON data from Google Sheets
fetch('https://docs.google.com/spreadsheets/d/15lS6FEOSuQT2ykKbUaEUjjEi9eKeqJYlsWaIX640YGQ/gviz/tq?tqx=out:json')
  .then(response => response.text())
  .then(text => {
    // Parse the JSON data
    const json = JSON.parse(text.substring(47).slice(0, -2)); // Remove callback function and trailing })
    const rows = json.table.rows;

    // Loop through the rows and add markers
    rows.forEach(row => {
      const timestamp = row.c[0] ? row.c[0].v : ''; // Adjust index for Timestamp
      const title = row.c[1] ? row.c[1].v : '';     // Adjust index for Title
      const description = row.c[2] ? row.c[2].v : ''; // Adjust index for Description
      const lat = parseFloat(row.c[3].v);           // Adjust index for Latitude
      const lng = parseFloat(row.c[4].v);           // Adjust index for Longitude
      const iconType = row.c[5] ? row.c[5].v : '';  // Adjust index for Icon Type (e.g., 'icon1', 'icon2')

      // Check if latitude and longitude are valid
      if (!isNaN(lat) && !isNaN(lng)) {
        const popupContent = `
          <div class="popup-content">
            <h4>${title}</h4>
            <p>${description}</p>
            <p><strong>Timestamp:</strong> ${timestamp}</p>
          </div>
        `;

        // Set the marker icon based on the iconType from the sheet
        let icon = customIcon1; // Default icon
        if (iconType === 'icon2') {
          icon = customIcon2;
        }

        // Add marker to the map
        L.marker([lat, lng], { icon: icon })
          .addTo(map)
          .bindPopup(popupContent);
      }
    });
  })
  .catch(error => console.error('Error fetching data:', error));
