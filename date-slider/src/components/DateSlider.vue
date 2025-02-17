<template>
  <div class="date-slider">
    <!-- Кнопки переключения -->
    <div class="view-toggle">
      <button
        @click="sliderType = 'years'"
        :class="{ active: sliderType === 'years' }"
      >
        Годы
      </button>
      <button
        @click="sliderType = 'months'"
        :class="{ active: sliderType === 'months' }"
      >
        Месяцы
      </button>
    </div>

    <div v-if="sliderType === 'years'" class="slider-container">
      <vue-slider
        v-model="yearRange"
        :min="minYear"
        :max="maxYear"
        :interval="1"
        :tooltip="'always'"
        :marks="yearMarks"
        :dotSize="10"
      ></vue-slider>
    </div>

    <div v-if="sliderType === 'months'" class="slider-container">
      <vue-slider
        v-model="monthRange"
        :min="minMonthIndex"
        :max="maxMonthIndex"
        :interval="1"
        :tooltip="'always'"
        :marks="filteredMonthMarks"
        :dotSize="10"
        :tooltip-formatter="formatTooltip"
      ></vue-slider>
    </div>
  </div>
</template>

<script>
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";

export default {
  components: { VueSlider },
  props: {
    minDate: String,
    maxDate: String,
    startDate: String,
    endDate: String,
  },
  data() {
    return {
      sliderType: "years",
      minYear: new Date(this.minDate).getFullYear(),
      maxYear: new Date(this.maxDate).getFullYear(),
      yearRange: [
        Math.max(
          new Date(this.startDate).getFullYear(),
          new Date(this.minDate).getFullYear()
        ),
        Math.min(
          new Date(this.endDate).getFullYear(),
          new Date(this.maxDate).getFullYear()
        ),
      ],
      monthRange: [],
      monthNames: [
        "Янв",
        "Фев",
        "Мар",
        "Апр",
        "Май",
        "Июн",
        "Июл",
        "Авг",
        "Сен",
        "Окт",
        "Ноя",
        "Дек",
      ],
    };
  },
  computed: {
    minMonthIndex() {
      return this.calculateMonthIndex(this.minYear, 1);
    },
    maxMonthIndex() {
      return this.calculateMonthIndex(this.maxYear, 12);
    },
    yearMarks() {
      let marks = {};
      for (let i = this.minYear; i <= this.maxYear; i++) {
        marks[i] = `${i}`;
      }
      return marks;
    },
    monthMarks() {
      let marks = {};
      for (let year = this.minYear; year <= this.maxYear; year++) {
        for (let month = 1; month <= 12; month++) {
          let index = this.calculateMonthIndex(year, month);
          if (month === 1) {
            marks[index] = `${year}`; // Январь заменяем на год
          } else {
            marks[index] = `${this.monthNames[month - 1]}`;
          }
        }
      }
      return marks;
    },
    filteredMonthMarks() {
      let marks = {};
      let counter = 0;
      for (let index in this.monthMarks) {
        counter++;
        if (counter % 4 === 0 || this.monthMarks[index].length === 12) {
          marks[index] = this.monthMarks[index];
        }
      }
      return marks;
    },
  },
  methods: {
    formatTooltip(value) {
      const { month, year } = this.parseMonthIndex(value);
      return `${this.monthNames[month - 1]}\n${year}`;
    },
    calculateMonthIndex(year, month) {
      return (year - this.minYear) * 12 + month;
    },
    parseMonthIndex(index) {
      const year = this.minYear + Math.floor((index - 1) / 12);
      const month = ((index - 1) % 12) + 1;
      return { month, year };
    },
  },
  mounted() {
    this.monthRange = [
      this.calculateMonthIndex(this.yearRange[0], 1),
      this.calculateMonthIndex(this.yearRange[1], 12),
    ];
  },
};
</script>

<style scoped>
.date-slider {
  max-width: 800px;
  margin: 30px auto;
  padding: 20px;
  background: #f4f6f9;
  border-radius: 10px;
  text-align: center;
  font-family: Arial, sans-serif;
}

/* Переключение между "Годы" и "Месяцы" */
.view-toggle {
  display: flex;
  justify-content: flex-start;
  padding: 10px;
  font-size: 16px;
  color: #3a78b6;
}

.view-toggle button {
  background: none;
  border: none;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  padding: 5px 15px;
  color: #3a78b6;
}

.view-toggle button.active {
  color: #007bff;
  text-decoration: underline;
}

/* Контейнер для слайдера */
.slider-container {
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

/* Основная линия слайдера */
.vue-slider-rail {
  background: #e0e6f0;
  height: 6px;
  border-radius: 3px;
}

/* Активная линия слайдера */
.vue-slider-process {
  background: #3a78b6;
  height: 6px;
  border-radius: 3px;
}

/* Ползунок */
.vue-slider-dot {
  background: #ffffff;
  border: 4px solid #3a78b6;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

/* Подсказки с датами */
.vue-slider-dot-tooltip {
  background: #ffffff;
  color: #3a78b6;
  font-size: 14px;
  font-weight: bold;
  padding: 8px 12px;
  border-radius: 6px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border: 2px solid #3a78b6;
}

/* Оформление текущего диапазона */
.selected-range {
  font-size: 18px;
  font-weight: bold;
  color: #3a78b6;
  margin-top: 15px;
  padding: 10px;
  background: #e8f0fe;
  border-radius: 6px;
  display: inline-block;
}
</style>
