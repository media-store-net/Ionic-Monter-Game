<template>
  <ion-page>
    <page-header title="Monster Slayer"></page-header>
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
import PageHeader from "@/components/PageHeader.vue";

export default defineComponent({
  name: 'Tab1',
  components: {PageHeader, MonsterGame, IonHeader, IonToolbar, IonTitle, IonContent, IonPage},
})
</script>
