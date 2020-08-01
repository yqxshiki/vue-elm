<template>
  <div>
    <p class="center">选择食品种类</p>
    <el-card class="box-card" shadow="hover">
      <el-form
        :model="category"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="食品种类">
          <el-select v-model="category.name" multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-collapse>
          <el-collapse-item title="添加食品种类" name="1">
            <el-form-item label="食品种类" prop="name">
              <el-input v-model="category.name"></el-input>
            </el-form-item>
            <el-form-item label="种类描述" prop="name">
              <el-input v-model="category.description"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="add_category">添加</el-button>
            </el-form-item>
          </el-collapse-item>
        </el-collapse>
      </el-form>
    </el-card>

    <p class="center">添加食品</p>
    <el-card class="box-card" shadow="hover">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="食品名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="食品活动" prop="name">
          <el-input v-model="ruleForm.activity"></el-input>
        </el-form-item>
        <el-form-item label="食品详情" prop="name">
          <el-input v-model="ruleForm.description"></el-input>
        </el-form-item>
        <el-form-item label="上传食品图片">
          <el-upload
            class="avatar-uploader"
            action="https://elm.cangdu.org/v1/addimg/shop"
            :show-file-list="true"
            :on-success="afterUpload_3"
          >
            <img
              v-if="ruleForm.image_path"
              :src="ruleForm.image_path"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="食品特点">
          <el-select
            v-model="ruleForm.attributes"
            multiple
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="包装费">
          <el-input-number
            v-model="ruleForm.specs[0].packing_fee"
            :min="0"
            :max="100"
            label="描述文字"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="价格">
          <el-input-number
            v-model="ruleForm.specs[0].price"
            :min="0"
            :max="100"
            label="描述文字"
          ></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即创建</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      category: {
        //
      },
      options: [
        {
          value: '新',
          label: '新品',
        },
        {
          value: '招牌',
          label: '招牌',
        },
      ],
      ruleForm: {
        name: '',
        description: '',
        image_path: '',
        activity: '',
        attribute: '',
        specs: [{ specs: '默认', packing_fee: 0, price: 20 }],
      },
      rules: {
        name: [{ required: true, message: '请输入内容', trigger: 'blur' }],
      },
    }
  },
  methods: {
    afterUpload_3(res) {
      this.$set(
        this.ruleForm,
        'catering_service_license_image',
        imgUrl() + res.image_path
      )
    },
    // 添加食品种类
    async add_category() {
      //
    },
    // 添加食品
    async submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>
<style>
.center {
  text-align: center;
  font-size: 20px;
  font-weight: 400;
}

.el-collapse-item__header {
  display: inherit;
  text-align: center;
}
</style>
