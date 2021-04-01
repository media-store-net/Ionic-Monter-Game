<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>{{ title }}</ion-title>
      <ion-buttons slot="start" v-if="$route.path !== '/tabs/tab1'">
        <ion-back-button default-href="tab1"></ion-back-button>
      </ion-buttons>
      <ion-buttons slot="end">
        <ion-button class="share-icon">
          <ion-icon :icon="shareSocial"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script>
import {defineComponent} from 'vue';
import {IonHeader, IonToolbar, IonIcon, IonTitle, IonButtons, IonBackButton, IonButton} from '@ionic/vue';
import {shareSocial} from 'ionicons/icons';

export default defineComponent({
  name: "PageHeader",
  props: {
    "title": {
      type: String,
      default: "PageTitle",
      required: false,
    }
  },
  components: {IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonButton, IonIcon},
  data() {
    return {
      shareSocial
    }
  },
})
</script>

<style scoped>
ion-toolbar {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0.5rem;
  color: #880017;
  text-shadow: 1px 1px 1px rgba(255, 255, 255, .5);
  text-align: center;
}

.share-icon, ion-back-button {
  color: white;
}
</style>
