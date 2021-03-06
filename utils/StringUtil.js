module.exports = {
    convertToViString: function(utfString) {
        var str = utfString.toLowerCase()
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
        str = str.replace(/đ/g, 'd')
        return str
    },

    getUrlTitle: function (title) {
        var tmp = this.convertToViString(title)
        tmp = tmp.replace(/\s|\/|:/g, '-')
        return tmp.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'')
    },

    /**
     * check if input string is hexadecial
     */
    isHex: function(h) {
        var regexHex = /[0-9A-Fa-f]{6}/g
        return regexHex.test(h)
    }
}