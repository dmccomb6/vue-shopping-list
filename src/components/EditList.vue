<template>
  <div v-if="item" class="edit-list container">
    <h2>Edit {{ item.listTitle }} List</h2>
    <form @submit.prevent="editForm">
      <div class="field title">
        <label for="title">List Title:</label>
        <input type="text" name="title" v-model="item.listTitle" />
      </div>
      <div v-for="(item_added, index) in item.listItems" :key="index" class="field">
        <label for="item_added">Items:</label>
        <input type="text" name="item_added" v-model="item.listItems[index]" />
        <i class="material-icons delete" @click="deleteList(item_added)">delete</i>
      </div>
      <div class="field add-item">
        <label for="add-item">Add an item</label>
        <input type="text" name="add-item" @keydown.enter.prevent="addItem" v-model="another" />
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn">Update Item</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from 'slugify'

export default {
  name: "EditList",
  data() {
    return {
      item: null,
      another: null,
      feedback: null
    };
  },
  methods: {
    //Submit Form
    editForm() {
      if(this.item.listTitle){
        this.feedback = null
        //create slug
        this.item.slug = slugify(this.item.listTitle, {
          replacement: "-",
          remove: /[$*^£."'!+=@()]/g,
          lower: true
        })
        db.collection('shopping-list').doc(this.item.id).update({
          listTitle: this.item.listTitle,
          listItems: this.item.listItems,
          slug: this.item.slug
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
        this.item.listItems.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "You must enter a value";
      }
    },
    //Method for deleting a list
    deleteList(item_added) {
      this.item.listItems = this.item.listItems.filter(itemDelete => {
        return itemDelete != item_added;
      });
    }
  },
  created() {
    let ref = db
      .collection("shopping-list")
      .where("slug", "==", this.$route.params.list_url);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.item = doc.data();
        this.item.id = doc.id;
      });
    });
  }
};
</script>

<style>
.edit-list {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
  display: block !important;
}
.edit-list h2 {
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
.edit-list .field {
  padding: 20px auto;
  position: relative;
}
.edit-list .delete {
  cursor: pointer;
  font-size: 1.4em;
  right: 0;
  bottom: 20px;
  position: absolute;
}
.edit-list .delete:hover {
  cursor: pointer;
  color: #fb8c00;
}
</style>