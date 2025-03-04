<template>
  <div class="date-slider">
    <!-- Кнопки переключения -->
    <div class="view-toggle">
      <button
        @click="viewMode = 'years'"
        :class="{ active: viewMode === 'years' }"
      >
        Все года
      </button>
      <button
        @click="viewMode = 'months'"
        :class="{ active: viewMode === 'months' }"
      >
        Месяцы
      </button>
    </div>

    <div class="slider-container">
      <vue-slider
        v-model="dateRange"
        :min="minIndex"
        :max="maxIndex"
        :interval="1"
        :tooltip="'always'"
        :marks="filteredMarks"
        :dotSize="10"
        :tooltip-formatter="formatTooltip"
        :tooltip-placement="'top'"
      >
        <template #tooltip="{ value }">
          <div :data-tooltip="formatTooltip(value)">
            {{ formatTooltip(value) }}
          </div>
        </template></vue-slider
      >
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
      viewMode: "months",
      minYear: new Date(this.minDate).getFullYear(),
      maxYear: new Date(this.maxDate).getFullYear(),
      monthNames: [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
      ],
      shortMonthNames: [
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
      dateRange: [],
    };
  },
  mounted() {
    // Безопасная установка значений
    const startIndex = this.calculateIndex(new Date(this.startDate));
    const endIndex = this.calculateIndex(new Date(this.endDate));

    if (!isNaN(startIndex) && !isNaN(endIndex)) {
      this.dateRange = [startIndex, endIndex];
    } else {
      console.error("Ошибка: dateRange содержит NaN", { startIndex, endIndex });
      this.dateRange = [this.minIndex, this.maxIndex];
    }
  },
  methods: {
    calculateIndex(date) {
      if (!(date instanceof Date) || isNaN(date.getTime())) {
        console.error("Ошибка: calculateIndex получил некорректную дату", date);
        return 0;
      }
      return (date.getFullYear() - this.minYear) * 12 + date.getMonth() + 1;
    },
    parseIndex(index) {
      const year = this.minYear + Math.floor((index - 1) / 12);
      const month = ((index - 1) % 12) + 1;
      return { month, year };
    },
    formatTooltip(value) {
      const { month, year } = this.parseIndex(value);
      return `${this.monthNames[month - 1]} ${year}`;
    },
  },
  computed: {
    minIndex() {
      return this.calculateIndex(new Date(this.minDate));
    },
    maxIndex() {
      return this.calculateIndex(new Date(this.maxDate));
    },
    marks() {
      let marks = {};
      for (let year = this.minYear; year <= this.maxYear; year++) {
        for (let month = 1; month <= 12; month++) {
          let index = this.calculateIndex(new Date(year, month - 1));

          if (month === 1) {
            // Январь заменяем на год в любом режиме
            marks[index] = `${year}`;
          } else {
            // Остальные месяцы отображаем сокращенно
            marks[index] = this.shortMonthNames[month - 1];
          }
        }
      }
      return marks;
    },
    filteredMarks() {
      let marks = {};
      let counter = 0;

      for (let index in this.marks) {
        let value = this.marks[index];

        if (this.viewMode === "years") {
          // В режиме "Годы" показываем только годы
          if (value.length === 4) {
            marks[index] = value;
          }
        } else {
          // В режиме "Месяцы" показываем не все месяцы (каждый 5-й)
          counter++;
          if (value.length === 4 || counter % 5 === 0) {
            marks[index] = value;
          }
        }
      }

      return marks;
    },
  },
};
</script>

<style>
.date-slider {
  max-width: 800px;
  margin: 30px auto;
  padding: 20px;
  background: #f4f6f9;
  border-radius: 10px;
  text-align: center;
  font-family: Arial, sans-serif;
}

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
  color: #83bfed;
}

.view-toggle button.active {
  color: #83bfed;
  text-decoration: underline;
}

.slider-container {
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.vue-slider-rail {
  background: #e0e6f0;
  height: 6px;
  border-radius: 3px;
}

.vue-slider-process {
  background: #83bfed;
  height: 6px;
  border-radius: 3px;
}

.vue-slider-dot {
  background: #ffffff;
  border: 4px solid #83bfed;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.vue-slider-dot-tooltip {
  background: #ffffff;
  color: #83bfed;
  font-size: 14px;
  font-weight: bold;
  padding: 8px 12px;
  border-radius: 6px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
.vue-slider-mark-step {
  display: none;
}
.vue-slider-dot-tooltip-top {
  background-color: white;
  color: #83bfed;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
