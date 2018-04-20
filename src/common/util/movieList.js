export default class Movie{
	constructor({id, title, director, casts, collectCount, rating, image, date, pubdates, subtype}) {
		this.id = id;
		this.title = title;
		this.director = director;
		this.casts = casts;
		this.collectCount = collectCount;
		this.rating = rating;
		this.image = image;
		this.date = date || '';
		this.pubdates = pubdates;
		this.subtype = subtype;
	}
}

export function createMovieList(list) {
	var movieArr = [];
	list.forEach(function(item){
		movieArr.push(new Movie({
			id: item.id,
			title: item.title,
			director: getDirector(item.directors),
			casts: item.casts,
			collectCount: item.collect_count,
			rating: item.rating.average,
			image: getImages(item.images),
			date: getDate(item.mainland_pubdate, item.pubdates) || '',
			pubdates: item.pubdates,
			subtype: item.subtype
		}))
	})
	return movieArr;
}

export function getDirector(arr){
	return arr[0].name
}

export function getImages(img){
	if(img.small){
		let _u = img.small.substring( 7 );
        return 'https://images.weserv.nl/?url=' + _u;
	}else {
		return ''
	}
}

// 预处理时间信息
function getDate(date, pubdates) {
  // 在上映电影列表中出现重映电影的情况
  if (new Date().getTime() > new Date(date).getTime()) { // 如果是重映电影
    // 判断该重映电影是否为待定日期
    let reg = /^\d{4}[-]\d{2}[-]\d{2}/;
    for (let i = 0; i < pubdates.length; i++) {
      // 如果重映电影的日期数据完整，不需要待定显示
      if (pubdates[i].indexOf('中国大陆重映') !== -1 && reg.test(pubdates[i])) {
        return normalizeDate(pubdates[i].match(reg)[0]);
      }
    }
    return findShowTime(pubdates, '中国大陆重映');
  }
  if (!date) { // 电影时间不确定，数据为空返回了undefined
    return findShowTime(pubdates, '中国大陆');
  }
  return normalizeDate(date);
};
// 获取电影上映的待定时间
function findShowTime(pubdates, key) { // 获取待定的月份或年份
  let month = '';
  let year = '';
  pubdates.forEach((item) => {
    let index = item.indexOf(key);
    if (index > -1) {
      if (!item.split('-')[1]) { // 不存在月份信息
        year = item.split('-')[0].substr(0, 4);
      } else {
        month = (item.split('-'))[1].substr(0, 2);
        if (month.substr(0, 1) === '0') { // 月份去零
          month = month.substr(1, 1);
        }
      }
    }
  });
  if (!month) {
    return `${year}年待定`;
  }
  return `${month}月待定`;
}
// 判断是否需要显示年份
function needYear(date) {
  return parseInt(new Date(date).getFullYear()) > parseInt(new Date().getFullYear());
}
// 格式化日期
function normalizeDate(date) {
  const week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  let currentWeek = week[new Date(date).getDay()]; // 获取当天星期
  let time = `${date.split('-')[1]}月${date.split('-')[2]}日`;
  if (time.substr(0, 1) === '0') { // 月份去零
    time = time.substr(1);
  }
  let ret = time + ' ' + currentWeek;
  if (needYear(date)) { // 如果不是本年度电影
    return `${date.split('-')[0]}年${ret}`;
  }
  return ret;
}
