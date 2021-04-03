<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content
            :pulling-icon="chevronDownCircleOutline"
            pulling-text="Pull to refresh"
            refreshing-spinner="circles"
            refreshing-text="Refreshing...">
        </ion-refresher-content>
      </ion-refresher>
      <page-header title="Monster Slayer"></page-header>
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
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonRefresher, IonRefresherContent} from '@ionic/vue';
import {chevronDownCircleOutline} from 'ionicons/icons'
import MonsterGame from "@/components/MonsterGame.vue";
import PageHeader from "@/components/PageHeader.vue";

export default defineComponent({
  name: 'Tab1',
  components: {
    PageHeader,
    MonsterGame,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonRefresher,
    IonRefresherContent
  },
  data() {
    return {
      chevronDownCircleOutline
    }
  },
  methods: {
    async doRefresh(event: any) {
      await document.location.reload();
      event.target.complete();
    }
  },
})
</script>
