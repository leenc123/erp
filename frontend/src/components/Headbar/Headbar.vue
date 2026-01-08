<template>
  <div style="text-align: center;">
    <div style="float: left;">
      <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="$emit('toggleCollapsed')" />
    </div>

    <a style="color: #0072f6;font-weight: bold;font-size: 20px;">{{ ProjectName }}</a>

    <div style="float: right;">
      <!-- <a-dropdown :trigger="['click']">
        <span class="trigger">
          {{currentWarehouse}}
          <a-icon type="down" />
        </span>
        <a-menu slot="overlay">
          <a-menu-item v-for="item in warehouseItems" :key="item.id" @click="onChangeWarehouse(item)">
            <span>{{item.name}}</span>
          </a-menu-item>
        </a-menu>
      </a-dropdown> -->

      <a-dropdown :trigger="['click']">

        <span class="trigger" style="color: #0072f6;">
          <a-avatar size="large" :src="avatarUrl" style="margin-top: -6px; margin-left: 8px;object-fit: cover;"
            :loadError="showDefultAvatar"
            :style="{ border: '2px solid #f0f0f0' }">
            {{ username.charAt(0).toUpperCase() }}
          </a-avatar>
          {{ username }}

          <a-icon type="down" style="margin-left: 10px;" :alt="username" />
        </span>
        <a-menu slot="overlay" >
          <a-menu-item>
            <a-upload v-model="fileList" name="file" :action="uploadUrl"
              :headers="headers" @change="handleUploadChange" :show-upload-list="false">
              <span>修改头像</span>
            </a-upload>
          </a-menu-item>


          <a-menu-divider />
          <a-menu-item @click="$router.push('/user/set_password')">
            <span>修改密码</span>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item @click="logout">
            <span>退出登录</span>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
// import { warehouseOption } from '@/api/option';
import Cookies from 'js-cookie';
import { updateUserAvatar } from '@/api/user';
export default {
  name: 'Headbar',
  props: ['collapsed', 'username','avatar'],
  inject: ['reloadPage'],
  data() {
    return {
      warehouseItems: [],
      defult_avatar: require("@/assets/avatar.png"),
      avatarUrl: '',
      currentWarehouse: '所有仓库',
      fileList: [],
      uploadUrl: '/api/common_images/',
      headers: {
        Authorization: `Bearer ${Cookies.get('access')}`,
      }
    };
  },
  methods: {
    initData() {
      this.avatarUrl = this.avatar;
      // warehouseOption({ page_size: 999999 }).then(data => {
      //   console.log(data.results)
      //   this.warehouseItems = [{ id: undefined, name: '所有仓库' }, ...data.results];
      // });
    },
    logout() {
      Cookies.remove('access');
      Cookies.remove('refresh');
      this.$router.push('/user/login');
    },
    showDefultAvatar(e) {
      console.log("加载默认头像");
      this.avatarUrl = this.defult_avatar;
    },
    onChangeWarehouse(item) {
      this.currentWarehouse = item.name;
      this.$store.commit('setWarehouse', item.id);
      this.reloadPage();
    },
    async handleUploadChange(info) {
      if (info.file.status === 'uploading') {
        return
      }
      
      if (info.file.status === 'done') {
        // 1. 获取上传后的图片URL
        const fileId = info.file.response?.id
        if (fileId) {
          // 2. 调用修改用户头像的接口
          try {
            const result = await updateUserAvatar({
              avatar_id: fileId  // 或者直接传文件ID
            })
            if (result) {
              this.$message.success('头像修改成功！')
              // 3. 更新本地用户信息
              this.$store.commit('setUser', result);
            }
          } catch (error) {
            this.$message.error('头像更新失败：' + error.message)
          }
        } else {
          this.$message.error('上传失败，未获取到图片地址')
        }
        
        // 清空文件列表
        this.fileList = []
      }
      
      if (info.file.status === 'error') {
        message.error('图片上传失败！')
        this.fileList = []
      }
    },
  },
  mounted() {
    this.initData();
  },
}
</script>

<style scoped>
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}
</style>