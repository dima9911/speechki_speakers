<template>
  <a-spin :spinning="loading">
    <div class="section-samples">
      <div class="title--line">
        <h2 class="section-title">
          Choose one of
          {{ filteredSpeakersLength }}
          voices in
          <span v-if="selectedLangs.length > 0"
            >selected {{ selectedLangs.length }}
          </span>
          <span v-else>{{ langsList.length }} </span>
          languages
        </h2>

        <a-select
          size="large"
          class="lang-select"
          v-model="selectedLangs"
          mode="multiple"
          :maxTagCount="1"
          show-search
          label-in-value
          placeholder="Select language"
          :filter-option="filterOption"
        >
          <a-select-option v-for="lang in langsList" :key="lang">
            {{ lang }}
          </a-select-option>
        </a-select>
      </div>
      <div class="voice-cards-con">
        <div class="voice-cards">
          <transition-group name="slideRight" tag="div" class="flex">
            <Speaker
              v-for="speaker in filteredSpeakersList"
              :key="speaker.id"
              v-show="speaker.show || speaker.show === undefined"
              :speaker="speaker"
            />
          </transition-group>
        </div>
      </div>
      <a-empty v-if="speakersList.length === 0" />
    </div>
  </a-spin>
</template>

<script>
import "./assets/scss/styles.scss";
import Speaker from "./components/Speaker/index";

export default {
  name: "Speakers",
  components: {
    Speaker,
  },
  data() {
    return {
      speakersList: [],
      pagination: undefined,
      loading: false,
      selectedLangs: [],
      speedsList: [
        {
          title: "0.7x",
          value: 0.7,
        },
        {
          title: "0.9x",
          value: 0.9,
        },
        {
          title: "1.0x",
          value: 1,
        },
        {
          title: "1.2x",
          value: 1.2,
        },
        {
          title: "1.5",
          value: 1.5,
        },
      ],
    };
  },
  provide() {
    return {
      speedsList: this.speedsList,
    };
  },
  computed: {
    langsList() {
      return this.$_.uniq(
        this.speakersList.map((speaker) => {
          return speaker.language.label.eng;
        })
      );
    },
    filteredSpeakersLength() {
      return this.filteredSpeakersList.filter((speaker) => {
        if (speaker.show || speaker.show === undefined) {
          return true;
        }
      }).length;
    },
    filteredSpeakersList() {
      return this.speakersList.map((speaker) => {
        if (this.selectedLangs.length === 0) {
          speaker.show = undefined;
        } else if (
          this.$_.find(this.selectedLangs, (lang) => {
            return lang.key.indexOf(speaker.language.label.eng) !== -1;
          })
        ) {
          speaker.show = true;
        } else {
          speaker.show = false;
        }
        return speaker;
      });
    },
  },
  watch: {
    selectedLangs(langs) {
      this.$debug(
        "Был изменен список выбранных языков",
        "warning",
        JSON.stringify(langs)
      );
    },
  },
  created() {
    this.$accessModule("speakers", this);
  },
  mounted() {
    this.getData();
  },
  methods: {
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    getData() {
      this.loading = true;
      this.$api({
        // url: "/api/v1/speakers/", //proxy version
        url: "https://api.books.speechkit.ru/api/v1/speakers/",
        method: "GET",
      })
        .then((response) => {
          if (response.data && response.data.results) {
            this.speakersList = response.data.results;
            this.pagination = this.$_.omit(response.data, "results");
            this.$debug("Данные спикеров успешно получены", "success");
          } else {
            throw response;
          }
        })
        .catch((error) => {
          this.$debug("Произошла ошибка загрузки спикеров!", "error", error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
