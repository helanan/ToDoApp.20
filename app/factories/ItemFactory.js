"use strict";

app.factory("ItemStorage", ($q, $http, FBCreds) => {

  let getItemList = (user) => {
    let items = [];
    return $q((resolve, reject) => {
      $http.get(`${FBCreds.databaseURL}/items.json?orderBy="uid"&equalTo="${user}"`)
      .then((itemObject) => {
        let itemCollection = itemObject.data;
        Object.keys(itemCollection).forEach((key) => {
            itemCollection[key].id = key;
            items.push(itemCollection[key]);
        });
        resolve(items);
      })
      .catch((error) => {
        reject(error);
      });
    });
  };


  let postNewItem = (newItem) => {
    return $q((resolve, reject) => {
      $http.post(`${FBCreds.databaseURL}/items.json`,
        JSON.stringify(newItem))
      .then((ObjectFromFirebase) => {
        resolve(ObjectFromFirebase);
      })
      .catch((error) => {
        reject(error);
      });
    });
  };


  let deleteItem = (itemId) => {
            console.log("Delete in factory", itemId);
            return $q((resolve, reject) => {
                $http.delete(`${FBCreds.databaseURL}/items/${itemId}.json`).
                then((ObjectFromFirebase) => {
                    resolve(ObjectFromFirebase);
                })
                .catch((error) => {
                    reject(error);
                });
            });
        };

  let getSingleItem = (itemId) => {
    return $q(function(resolve, reject){
      $http.get(`${FBCreds.databaseURL}/items/${itemId}.json`)
      .then(function(itemObject){
        resolve(itemObject.data);
      })
      .catch(function(error){
        reject(error);
      });
    });
  };

let updateItem = (itemId, editedItem) => {
  return $q(function(resolve,reject){
    $http.patch(`${FBCreds.databaseURL}/items/${itemId}.json`,
      angular.toJson(editedItem))
      .then(function(ObjectFromFirebase){
        resolve(ObjectFromFirebase);
      })
      .catch(function(error){
        reject(error);
      });
  });
};


  return {getItemList, postNewItem, deleteItem, getSingleItem, updateItem};

});
