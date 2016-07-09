var express = require('express')
var Subject = require('../models/Subject')

var router = express.Router()


router.post('/', function(req, res, next) {
  res.send('respond with a resource')
})

function setupSubjects() {
    var subjects = []
    subjects.push({
        title: {
            vi: 'Thiết kế đồ họa',
            en: 'Graphic design'
    	},
        sequence: 1,
        thumbnail: ''
    })
    subjects.push({
        title: {
            vi: 'Nghệ thuật',
            en: 'Art'
    	},
        sequence: 2,
        thumbnail: ''
    })
    subjects.push({
        title: {
            vi: 'Kinh doanh',
            en: 'Business'
    	},
        sequence: 3,
        thumbnail: ''
    })
    subjects.push({
        title: {
            vi: 'Tiếp thị',
            en: 'Marketing'
    	},
        sequence: 4,
        thumbnail: ''
    })
    subjects.push({
        title: {
            vi: 'Công nghệ',
            en: 'Technology'
    	},
        sequence: 5,
        thumbnail: ''
    })
    subjects.push({
        title: {
            vi: 'Phát triển bản thân'
    	},
        sequence: 6,
        thumbnail: ''
    })
    subjects.push({
        title: {
            vi: 'Chụp ảnh làm phim',
            en: 'Photograph'
    	},
        sequence: 7,
        thumbnail: ''
    })
    subjects.push({
        title: {
            vi: 'Ứng dụng VP',
            en: 'Office Apps'
    	},
        sequence: 8,
        thumbnail: ''
    })
    subjects.push({
        title: {
            vi: 'Ngoại ngữ',
            en: 'Language'
    	},
        sequence: 9,
        thumbnail: ''
    })
    subjects.push({
        title: {
            vi: 'Thể thao',
            en: 'Sport'
    	},
        sequence: 10,
        thumbnail: ''
    })
    Subject.collection.insert(subjects, function(err, result) {
		if (err) {
			console.log(err);
			res.status(500).json({error: err});
		} else {
			res.json(result);
		}
	})
}

module.exports = router
