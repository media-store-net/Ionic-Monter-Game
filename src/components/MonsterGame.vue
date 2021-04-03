<template>
  <div id="game">
    <section id="monster" class="container">
      <h2>Monster Health</h2>
      <div class="healthbar">
        <div class="healthbar__value" :style="monsterBarStyles"></div>
      </div>
    </section>
    <section id="player" class="container">
      <h2>Your Health</h2>
      <div class="healthbar">
        <div class="healthbar__value" :style="playerBarStyles"></div>
      </div>
    </section>
    <section class="container" v-if="winner">
      <h2>Game Over!</h2>
      <h3 v-if="winner === 'monster'">You lost!</h3>
      <h3 v-else-if="winner === 'player'">You won!</h3>
      <h3 v-else>It's a draw!</h3>
      <button @click="startGame">Start New Game</button>
    </section>
    <section id="controls" v-else>
      <ion-fab vertical="bottom" horizontal="end">
        <ion-fab-button type="button" @click="attackMonster">
          <ion-icon :icon="sendOutline"></ion-icon>
        </ion-fab-button>
        <ion-fab-button type="button" :disabled="mayUseSpecialAttack" @click="specialAttackMonster">
          <ion-icon :icon="rocketOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <ion-fab vertical="bottom" horizontal="start">
        <ion-fab-button type="button" @click="healPlayer">
          <ion-icon :icon="heartCircleOutline"></ion-icon>
        </ion-fab-button>
        <ion-fab-button type="button" @click="surrender">
          <ion-icon :icon="logOutOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </section>
    <section id="log" class="container">
      <h2>Battle Log</h2>
      <ul>
        <li v-for="(logMessage, index) in logMessages" :key="index">
            <span
                :class="{'log--player': logMessage.actionBy === 'player', 'log--monster': logMessage.actionBy === 'monster'}">
              {{ logMessage.actionBy === 'player' ? 'Player' : 'Monster' }}
            </span>
          <span v-if="logMessage.actionType === 'heal'">
              heals himself for
              <span class="log--heal">{{ logMessage.actionValue }}</span></span
          >
          <span v-else>
              attacks and deals
              <span class="log--damage">{{ logMessage.actionValue }}</span>
            </span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {IonFab, IonFabButton, IonIcon} from '@ionic/vue';
import {heartCircleOutline, rocketOutline, sendOutline, logOutOutline} from 'ionicons/icons'
import getRandomValue from "../fn/getRandomValue";
import DataTypes from "@/interfaces/DataTypes";
import StylesOutputType from "@/interfaces/StylesOutputType";
import LogMessageType from "@/interfaces/LogMessageType";

export default defineComponent({
  name: "MonsterGame",
  components: {
    IonIcon,
    IonFab,
    IonFabButton
  },
  data(): DataTypes {
    return {
      heartCircleOutline,
      rocketOutline,
      sendOutline,
      logOutOutline,
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: []
    };
  },
  computed: {
    monsterBarStyles(): StylesOutputType {
      if (this.monsterHealth < 0) {
        return {width: '0%'};
      }
      return {width: this.monsterHealth + '%'};
    },
    playerBarStyles(): StylesOutputType {
      if (this.playerHealth < 0) {
        return {width: '0%'};
      }
      return {width: this.playerHealth + '%'};
    },
    mayUseSpecialAttack(): boolean {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value: number): void {
      if (value <= 0 && this.monsterHealth <= 0) {
        // A draw
        this.winner = 'draw';
      } else if (value <= 0) {
        // Player lost
        this.winner = 'monster';
      }
    },
    monsterHealth(value: number): void {
      if (value <= 0 && this.playerHealth <= 0) {
        // A draw
        this.winner = 'draw';
      } else if (value <= 0) {
        // Monster lost
        this.winner = 'player';
      }
    },
  },
  methods: {
    startGame(): void {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.winner = null;
      this.currentRound = 0;
      this.logMessages = [];
    },
    attackMonster(): void {
      this.currentRound++;
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.addLogMessage('player', 'attack', attackValue);
      this.attackPlayer();
    },
    attackPlayer(): void {
      const attackValue = getRandomValue(8, 15);
      this.playerHealth -= attackValue;
      this.addLogMessage('monster', 'attack', attackValue);
    },
    specialAttackMonster(): void {
      this.currentRound++;
      const attackValue = getRandomValue(10, 25);
      this.monsterHealth -= attackValue;
      this.addLogMessage('player', 'attack', attackValue);
      this.attackPlayer();
    },
    healPlayer(): void {
      this.currentRound++;
      const healValue = getRandomValue(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.addLogMessage('player', 'heal', healValue);
      this.attackPlayer();
    },
    surrender(): void {
      this.winner = 'monster';
    },
    addLogMessage(who: string, what: string, value: number): void {
      const message: LogMessageType = {
        actionBy: who,
        actionType: what,
        actionValue: value
      }
      this.logMessages.unshift(message);
    }
  },
})
</script>

<style scoped>
section {
  width: 90%;
  max-width: 40rem;
  margin: auto;
}

.healthbar {
  width: 100%;
  height: 40px;
  border: 1px solid #575757;
  margin: 1rem 0;
  background: #fde5e5;
}

.healthbar__value {
  background-color: #00a876;
  width: 100%;
  height: 100%;
}

.container {
  text-align: center;
  padding: 0.5rem;
  margin: 1rem auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
}

#monster h2,
#player h2 {
  margin: 0.25rem;
}

#controls {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

ion-fab {
  margin-bottom: 3em;
}
ion-fab-button {
  margin-bottom: 1em;
  background-color: #88005b;
  color: white;
  border-radius: 50%;
}

button {
  font: inherit;
  border: 1px solid #88005b;
  background-color: #88005b;
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  margin: 1rem;
  width: 12rem;
  cursor: pointer;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.26);
}

button:focus {
  outline: none;
}

button:hover,
button:active {
  background-color: #af0a78;
  border-color: #af0a78;
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.26);
}

button:disabled {
  background-color: #ccc;
  border-color: #ccc;
  box-shadow: none;
  color: #3f3f3f;
  cursor: not-allowed;
}

#log ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

#log li {
  margin: 0.5rem 0;
}

.log--player {
  color: #7700ff;
}

.log--monster {
  color: #da8d00;
}

.log--damage {
  color: red;
}

.log--heal {
  color: green;
}
</style>
