<template>
  <div class="container">
    <div class="row">
      <div
        class="test col s12 m6 l4 card blue darken-1"
        v-for="shoppingItem in shoppingList"
        :key="shoppingItem.id"
      >
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
  </div>
</template>

<script>
import db from "@/firebase/init";

export default {
  name: "Index",
  data() {
    return {
      shoppingList: []
    };
  },
  methods: {
    //Method to delete list
    deleteList(id) {
      db.collection("shopping-list")
        .doc(id)
        .delete()
        .then(() => {
          this.shoppingList = this.shoppingList.filter(shoppingList => {
            return shoppingList.id != id;
          });
        });
    }
  },
  created() {
    //Fetch data from firestore
    db.collection("shopping-list")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let shopping_items = doc.data();
          shopping_items.id = doc.id;
          this.shoppingList.push(shopping_items);
        });
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body {
  background-color: lightgray;
}
.container{
  padding: 20px;
}
.card .ingredientItems li {
  display: inline-block;
  padding: 4px 2px 4px 2px;
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 16px;
  border: 3px solid white;
  margin-top: 45px;
  margin-bottom: 5%;
  width: 50%;
}
.card h2 {
  font-size: 1.8em;
  text-align: center;
  margin: 0;
}
.card .ingredientItems {
  margin: 30px auto;
  padding: 5px;
  max-width: 100%;
}
.white-text {
  text-decoration: underline;
}
.card .delete {
  color: white;
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  font-size: 1.4em;
}
.card .delete:hover {
  color: #fb8c00;
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  font-size: 1.4em;
}

@media screen and (min-width: 980px) /* Desktop */ {
  body {
    background: lightgray;
  }
  .card {
    border: 3px solid white;
    margin-bottom: 2%;
  }
}

@media screen and (max-width: 979px) /* Tablet */ {
  body {
    background: lightgray;
  }
  .card {
    border: 3px solid white;
    margin-bottom: 2%;
  }
}

@media screen and (max-width: 500px) /* Mobile */ {
  body {
    background: lightgray;
  }
  .card {
    border: 3px solid white;
    margin-bottom: 8%;
  }
}
</style>
