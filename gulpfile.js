const gulp = require('gulp')
const awspublish = require('gulp-awspublish')
const creds = require('/Users/adamtolley/creds/qe-web.aws.json')

gulp.task('publish', function () {
  // create a new publisher using S3 options
  // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#constructor-property
  var publisher = awspublish.create(
    {
      region: 'us-east-1',
      params: {
        Bucket: 'theiris'
      },
      ...creds
    },
    {
      cacheFileName: './scratch/s3cache'
    }
  )

  // define custom headers
  var headers = {
    'Cache-Control': 'max-age=315360000, no-transform, public'
    // ...
  }

  return gulp.src('./dist/**')
    .pipe(publisher.publish(headers))
    .pipe(publisher.cache())
    .pipe(awspublish.reporter())
})
