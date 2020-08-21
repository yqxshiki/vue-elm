<template>
  <div id="login">
    <el-card class="box-card" shadow="always">
      <div slot="header" class="clearfix">
        <span>
          <h4>饿了么后台管理系统</h4>
        </span>
      </div>
      <el-form
        :model="elm_form"
        status-icon
        :rules="rules"
        ref="elm_form"
        label-width="100px"
        class="demo-elm_form"
      >
        <!-- prop="user_name" -->
        <el-form-item label="用户名">
          <el-input
            type="text"
            v-model="elm_form.user_name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- prop="password" -->
        <el-form-item label="密码">
          <el-input
            type="password"
            v-model="elm_form.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            size="medium "
            style="width:100%"
            @click="submitForm('elm_form')"
            >提交</el-button
          >
        </el-form-item>
        <div class="tip">
          <p>温馨提示：</p>
          <span>未登录过的新用户，自动注册 注册过的用户可凭账号密码登录</span>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { Submit } from '../api/login'
import { localSetItem } from '../lib/util'
export default {
  name: 'login',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.elm_form.user_name !== '') {
          this.$refs.elm_form.validateField('user_name')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        if (this.elm_form.password !== '') {
          this.$refs.elm_form.validateField('password')
        }
        callback()
      }
    }
    return {
      elm_form: {
        user_name: '',
        password: '',
      },
      rules: {
        password: [{ validator: validatePass, trigger: 'blur' }],
        user_name: [{ validator: validatePass2, trigger: 'blur' }],
      },
    }
  },
  methods: {
    async submitForm() {
      Submit(this.elm_form).then((res) => {
        if (res.data.status == 1) {
          this.$message({
            message: '恭喜你，登录成功',
            type: 'success',
          })
          console.log(res)
          localSetItem(process.env.VUE_APP_LOGIN, res.data.status)
          this.$router.push('/')
        } else {
          this.$message({
            message: '请重新登录',
            type: 'error',
          })
          this.elm_form = ''
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>
<style lang="scss">
@import '../assets/scss/login.scss';
</style>
