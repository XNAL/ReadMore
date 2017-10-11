<template>
<section class="cat-bar">
	<div class="cat-filter" v-show="!isBrief">
		<ul class="cat-fliter-list" ref="typeList">
			<li v-for="type in typeList"
				:class="['cat-filter-item', { active: type.value === selectedType }]"
				:data-value="type.value"
				:data-name="type.name"
				@click="filterChange($event, 'type')">
				{{ type.name }}
			</li>
		</ul>
	</div>
	<div class="cat-filter" v-show="!isBrief">
		<ul class="cat-fliter-list" ref="minorList">
			<li v-for="minor in minorList"
				:class="['cat-filter-item', { active: minor === selectedMinor }]"
				:data-value="minor"
				@click="filterChange($event, 'minor')">
				{{ minor }}
			</li>
		</ul>
	</div>
	<div class="cat-brief" v-show="isBrief" @click="spreadFilter">
		<span>{{ selectedMinor }}</span>
		<span>-</span>
		<span>按{{ selectedTypeName }}</span>
		<span>
			<svg class="icon" aria-hidden="true">
				<use xlink:href="#icon-down"></use>
			</svg>
		</span>
	</div>
</section>
</template>

<script>
import api from '../fetch/api';
import {debounce} from '../util/util';

export default {
	name: 'catbar',
	props: {
		gender: String,
		major: String
	},
	data() {
		return {
			typeList: [{
				value: 'hot',
				name: '热门'
			}, {
				value: 'new',
				name: '新书'
			}, {
				value: 'reputation',
				name: '好评'
			}, {
				value: 'over',
				name: '完结'
			}, {
				value: 'monthly',
				name: '包月'
			}],
			selectedType: 'hot',
			selectedTypeName: '热门',
			minorList: ['全部'],
			selectedMinor: '全部',
			isBrief: false,
			$docElement: null,
			$body: null
		}
	},
	created() {
		api.getMinorList()
			.then(data => {
				for (let [index, elem] of data[this.gender].entries()) {
					if (elem.major === this.major) {
						this.minorList.push(...elem.mins);
						return;
					}
				}
			})
	},
	mounted() {
		this.$docElement = document.documentElement;
		this.$body = document.body;
		window.addEventListener('scroll', debounce(this.showBrief));
	},
	methods: {
		showBrief: function() {
			if ((this.$body.scrollTop + this.$docElement.scrollTop) > 40) {
				this.isBrief = true;
			} else {
				this.isBrief = false;
			}
		},
		filterChange: function(e, type) {
			let curTargetData = e.currentTarget.dataset;
			if (type === 'type') {
				this.selectedType = curTargetData.value;
				this.selectedTypeName = curTargetData.name;
			} else {
				this.selectedMinor = curTargetData.value;
			}
			this.$emit('filter-change', this.selectedType, this.selectedMinor === '全部' ? '' : this.selectedMinor);
		},
		spreadFilter: function() {
			this.isBrief = false;
		}
	}
}
</script>

<style lang="scss">
.cat-bar {
    position: fixed;
    top: 40px;
    left: 0;
    right: 0;
    font-size: 14px;
	color: #666;
    background-color: #fff;
    z-index: 1;

    .cat-filter {
        position: relative;
        // height: 40px;
        border-bottom: 1px solid #e8e8e8;
        box-sizing: border-box;
    }
    .cat-fliter-list {
        position: relative;
        // overflow: hidden;
		height: 100%;
		overflow-x: scroll;
		white-space: nowrap;

        .cat-filter-item {
            // float: left;
            display: inline-block;
            padding: 0 5px;
            line-height: 40px;

            &.active {
                color: #ed424b;
            }
        }
    }

    .cat-brief {
        position: relative;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #e8e8e8;
        box-sizing: border-box;
        text-align: center;
	    font-size: 12px;

        span {
            padding: 0 2px;

			.icon {
				width: 14px;
				height: 14px;
				margin-left: -3px;
				color: #aaa;
			}
        }
    }
}
</style>
