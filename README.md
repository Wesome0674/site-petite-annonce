# Documentation API

## Endpoints disponibles 

### 1. Obtenir la liste des annonces 
```javascript
function getAllAnonnces() {
    fetch('http://172.20.10.3:8888/site-petite-annonce/api/v1/?annonces')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Annonces:', data);
        })
        .catch(error => {
            console.error('Error fetching annonces:', error);
        });
}
```
