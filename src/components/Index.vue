<template>
  <div class="index container">
    <div class="card blue darken-1" v-for="shoppingItem in shoppingList" :key="shoppingItem.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteList(shoppingItem.id)">delete</i>
        <h2 class="white-text">{{ shoppingItem.listTitle }}</h2>
        <ul class="ingredientItems">
          <li v-for="(list_item, index) in shoppingItem.listItems" :key="index">
            <span class="chip">{{ list_item }}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large waves-effect waves-light halfway-fab orange darken-1">
        <router-link :to="{ name: 'EditList', params: {list_url: shoppingItem.slug} }">
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'

export default {
  name: "Index",
  data() {
    return {
      shoppingList: []
    }
  },
  methods: {
    //Method to delete list
    deleteList(id){
      db.collection('shopping-list').doc(id).delete()
      .then(() => {
        this.shoppingList = this.shoppingList.filter(shoppingList => {
          return shoppingList.id != id
        })
      })
    }
  },
  created(){
      //Fetch data from firestore
      db.collection('shopping-list').get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let shopping_items  = doc.data()
          shopping_items.id = doc.id
          this.shoppingList.push(shopping_items)
        })
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body {
  background-color: lightgray;
}
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}
.index h2 {
  font-size: 1.8em;
  text-align: center;
  margin: 0;
}
.index .ingredientItems {
  margin: 30px auto;
}
.index .ingredientItems li {
  display: inline-block;
}
.card {
  border: 3px solid white;
}
.white-text {
  text-decoration: underline;
}
.index .delete {
  color: white;
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  font-size: 1.4em;
}
.index .delete:hover {
  color: #fb8c00;
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  font-size: 1.4em;
}
</style>
