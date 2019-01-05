const express = require('express')
const router = express.Router()
const request = require('request')
const qs = require('qs')
const cors = require('cors')
const VIDEO_URL = "http://www.youtube.com/get_video_info?html5=1&video_id="

router.options('/api/get-video-info', cors()) // enable pre-flight request for POST request
router.post('/api/get-video-info', cors(), function (req, res) {
  const videoId = req.body.video_id
  request(`${VIDEO_URL}${videoId}`, function (err, response) {
    if (err) {
      res.status(500).json({
        message: err.message
      })
    } else {
      const get_video_info = qsToJson(response.body);

      // remapping urls into an array of objects
      let tmp = get_video_info["url_encoded_fmt_stream_map"];
      if (tmp) {
        tmp = tmp.split(",");
        for (let i in tmp) {
          tmp[i] = qsToJson(tmp[i]);
          tmp[i].ext = tmp[i].type
            .match(/^video\/\w+(?=;)/g)[0]
            .replace(/^video\//, "");
        }
        get_video_info["videos"] = tmp;
      }
      get_video_info.title = get_video_info.title.replace(/\+/g, " ");
      res.json({
        data: get_video_info
      })
    }

  })
  // res.json({'hello' : 'world'})
})

function qsToJson(qs) {
  let res = {};
  let pars = qs.split("&");
  let kv, k, v;
  for (let i in pars) {
    kv = pars[i].split("=");
    k = kv[0];
    v = kv[1];
    res[k] = decodeURIComponent(v);
  }
  return res;
}

module.exports = router;
