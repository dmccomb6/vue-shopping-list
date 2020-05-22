<template>
  <div class="add-list container">
    <h2 class="center-align">Add Shopping List</h2>
    <form @submit.prevent="submitForm">
      <div class="field title">
        <label for="title">List Title:</label>
        <input type="text" name="title" v-model="listTitle" />
      </div>
      <div v-for="(item_added, index) in items" :key="index" class="field">
      <label for="item_added">Items:</label>
      <input type="text" name="item_added" v-model="items[index]">
        <i class="material-icons delete" @click="deleteList(item_added)">delete</i>
      </div>
      <div class="field add-item">
        <label for="add-item">Add an item</label>
        <input type="text" name="add-item" @keydown.enter.prevent="addItem" v-model="another" />
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text"> {{ feedback }}</p>
        <button class="btn">Create List</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
  name: "AddList",
  data() {
    return {
      listTitle: null,
      another: null,
      items: [],
      feedback: null,
      slug: null
    };
  },
  methods: {
    submitForm() {
      if(this.listTitle){
        this.feedback = null
        //create slug
        this.slug = slugify(this.listTitle, {
          replacement: "-",
          remove: /[$*^£."'!+=@()]/g,
          lower: true
        })
        db.collection('shopping-list').add({
          listTitle: this.listTitle,
          listItems: this.items,
          slug: this.slug
        }).then(() => {
          this.$router.push( { name: 'Index' })
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.feedback = 'Enter a title'
      }
    },
    //Method For Adding an Item
    addItem() {
      if (this.another) {
        this.items.push(this.another);
        this.another = null
        this.feedback = null
      }else{
        this.feedback = 'You must enter a value'
      }
    },
    //Method for deleting a list
    deleteList(item_added){
      this.items = this.items.filter(itemDelete => {
        return itemDelete != item_added
      })
    }
  }
};
</script>

<style>
.add-list {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.add-list h2 {
  color: #fb8c00;
  padding: 10px;
  font-size: 2.5em;
}
.btn {
  text-align: center;
  border-radius: 15px;
  background-color: #039be5;
}
.btn:hover {
  text-align: center;
  border-radius: 15px;
  background: #fb8c00;
}
.add-list .field {
  padding: 20px auto;
  position: relative;
}
.add-list .delete {
  cursor: pointer;
  font-size: 1.4em;
  right: 0;
  bottom: 20px;
  position: absolute;
}
.add-list .delete:hover {
  cursor: pointer;
  color:#fb8c00;
}
</style>