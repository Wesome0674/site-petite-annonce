# Documentation API

## Endpoints disponibles 

### 1. Obtenir la liste des annonces 
```javascript
function getAllAnonnces() {
    fetch('https://dnmade1.gobelinsannecy.fr/PetitesAnnonces/api/v1/?annonces')
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
### 2. Obtenir la liste des categories 
```javascript
function getAllCategories() {
    fetch('https://dnmade1.gobelinsannecy.fr/PetitesAnnonces/api/v1/categories?')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Categories:', data);
        })
        .catch(error => {
            console.error('Error fetching categories:', error);
        });
}
```

### 3. Obtenir la liste des users 
```javascript
function getAllUsers() {
    fetch('https://dnmade1.gobelinsannecy.fr/PetitesAnnonces/api/v1/?users')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Users:', data);
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
}
```

### 4. Obtenir la liste des message d'un user
```javascript
function getMessagesFromUser() {
    fetch('https://dnmade1.gobelinsannecy.fr/PetitesAnnonces/api/v1/?messages&user={idUser}')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Messages:', data);
        })
        .catch(error => {
            console.error('Error fetching messages:', error);
        });
}
```


### 5. Creer une annonce
```javascript
function createAnnonce(titre, description, prix, idUser, idCategorie) {
    const annonceData = {
        type: 'annonces',
        titre: titre,
        description: description,
        prix: prix.toString(),
        idUser: idUser.toString(),
        idCategorie: idCategorie
    };

    fetch('https://dnmade1.gobelinsannecy.fr/PetitesAnnonces/api/v1/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(annonceData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Annonce created:', data);
    })
    .catch(error => {
        console.error('Error creating annonce:', error);
    });
}

// Example usage:
createAnnonce("Vélo de course", "Vélo en très bon état", "299.99", 1, 1);
```




