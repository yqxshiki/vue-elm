<template>
  <div id="login">
    <el-card class="box-card"
             shadow="always">
      <div slot="header"
           class="clearfix">
        <span>
          <h4>饿了么后台管理系统</h4>
        </span>
      </div>
      <el-form :model="elm_form"
               status-icon
               :rules="rules"
               ref="elm_form"
               label-width="100px"
               class="demo-elm_form">
        <el-form-item label="用户名"
                      prop="user_name">
          <el-input type="text"
                    v-model="elm_form.user_name"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="password">
          <el-input type="password"
                    v-model="elm_form.password"
                    autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
                     size="medium "
                     style="width:100%"
                     @click="submitForm('elm_form')">提交</el-button>
        </el-form-item>
        <div class="tip">
          <p>温馨提示：</p>
          <span>未登录过的新用户，自动注册
            注册过的用户可凭账号密码登录</span>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { Submit } from '../api/login'
export default {
  name: "login",
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.elm_form.user_name !== '') {
          this.$refs.elm_form.validateField('user_name');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        console.log(11)

        if (this.elm_form.password !== '') {
          this.$refs.elm_form.validateField('password');
        }
        callback();
      }
    };
    return {
      elm_form: {
        user_name: '',
        password: '',
      },
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        username: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    async submitForm () {
      Submit(this.elm_form).then(res => {
        this.$message({
          message: '恭喜你，登录成功',
          type: 'success'
        })
        this.$router.push('/')
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
  },
}

</script>
<style lang="scss">
#login {
  background: rgb(50, 64, 87);
  height: 100vh;
  .box-card {
    width: 400px;
    height: 320px;
    position: absolute;
    border-radius: 20px;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    box-sizing: border-box;
    .el-card__header {
      padding: 0;
    }
    .el-card__body {
      margin-left: -40px;
    }
    .text {
      font-size: 12px;
    }
    .clearfix {
      text-align: center;
    }
    .el-form-item {
      margin-top: 16px;
      margin-bottom: 0;
    }
    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both;
    }
    .tip {
      color: red;
      font-size: 10px;
      text-align: center;
    }
  }
}
</style>