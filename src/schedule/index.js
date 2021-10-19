const schedule = require('node-schedule');
const fs = require('fs')
const path = require('path')


const deleteFolder =  function(path) {
    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolder(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

// 生成新的定时任务
let interval = () => {
  console.log('开始清理', __dirname);
  schedule.scheduleJob('定期清空文件夹', '30 1 1 * * *', () => {
    console.log('任务建立成功');
    // fs.rmdir(path.resolve(__dirname, '../../uploads/pictures'), (err) => {
    //   if(err){
    //     console.log('删除出错', err);
    //     return
    //   }
    //   console.log('文件夹清空成功');
    //   fs.mkdir(path.resolve(__dirname, '../../uploads/pic'), (err) => {
    //     if(err) return
    //     console.log('文件夹创建成功');
    //   })
    // } )
    deleteFolder(path.resolve(__dirname, '../../uploads/pictures'))
    console.log('文件递归删除');
    fs.mkdirSync(path.resolve(__dirname, '../../uploads/pictures'))
  })
}
module.exports = interval
