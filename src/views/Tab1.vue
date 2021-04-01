<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          <header>
            <h1>Monster Slayer</h1>
          </header>
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Monster Game</ion-title>
        </ion-toolbar>
      </ion-header>

      <monster-game/>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent} from '@ionic/vue';
import MonsterGame from "@/components/MonsterGame.vue";

export default defineComponent({
  name: 'Tab1',
  components: {MonsterGame, IonHeader, IonToolbar, IonTitle, IonContent, IonPage}
})
</script>
<style scoped>
header {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0.5rem;
  color: #880017;
  text-align: center;
}
</style>
