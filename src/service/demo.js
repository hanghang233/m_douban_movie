import axios from 'axios'
import jsonp from '@/common/util/jsonp.js'
import {commonParams, options} from '@/common/util/config.js'
//import { commonParams } from './config';

export default {
	getSliderList(data) {
		var url = "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg";
		var params = Object.assign({}, commonParams, data);
		return jsonp(url, params, options);
	},
}