fetch('https://docs.google.com/spreadsheets/d/1ajnO27PRxnHSQiRhyVpukeir-zqTcUfK7F_kfM1nfkc/gviz/tq?tqx=out:json')
  .then(response => response.text())
  .then(text => {
    // Parse the JSON data
    const json = JSON.parse(text.substring(47).slice(0, -2)); // Remove callback function and trailing })
    const rows = json.table.rows;

    // Loop through the rows and add markers
    rows.forEach(row => {
      const timestamp = row.c[0] ? row.c[0].v : ''; // Timestamp
      const title = row.c[5] ? row.c[5].v : ''; // Title
      const description = row.c[6] ? row.c[6].v : ''; // Description
      const lat = parseFloat(row.c[2].v); // Latitude
      const lng = parseFloat(row.c[3].v); // Longitude
      const categories = row.c[8]? row.c[8].v : '';// categories

      if (!isNaN(lat) && !isNaN(lng)) {
        const popupContent = `
          <div class="popup-content">
            <h4>${title}</h4>
            <p>${description}</p>
            <p><strong>Category:</strong> ${categories}</p>
            <p><strong>Timestamp:</strong> ${timestamp}</p>
          </div>
        `;
        L.marker([lat, lng]).addTo(map).bindPopup(popupContent);
      }
    });
  })
  .catch(error => console.error('Error fetching data:', error));
      
