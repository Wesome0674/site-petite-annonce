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
