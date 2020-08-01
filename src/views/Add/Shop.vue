<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="店铺名称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="详细地址" prop="address">
      <el-autocomplete
        v-model="ruleForm.address"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入地址"
        style="width: 100%;"
        @select="handleSelect"
      ></el-autocomplete>
      <span
        >当前城市： <span style="color:#f40">{{ cityInfo.name }}</span></span
      >
    </el-form-item>
    <el-form-item label="联系电话" prop="phone">
      <el-input v-model.number="ruleForm.phone"></el-input>
    </el-form-item>
    <el-form-item label="店铺简介" prop="description">
      <el-input v-model="ruleForm.description"></el-input>
    </el-form-item>
    <el-form-item label="店铺标语" prop="description">
      <el-input v-model="ruleForm.promotion_info"></el-input>
    </el-form-item>
    <el-form-item label="店铺分类" prop="region">
      <el-cascader
        v-model="category"
        placeholder="请选择店铺分类"
        :options="categoryOptions"
        :props="{ expandTrigger: 'hover' }"
      ></el-cascader>
    </el-form-item>
    <el-form-item label="店铺特点" prop="trait">
      <el-switch
        active-text="品牌保证"
        name="type"
        v-model="ruleForm.is_premium"
      ></el-switch>
      <el-switch
        active-text=" 蜂鸟专送"
        name="type"
        v-model="ruleForm.delivery_mode"
      ></el-switch>
      <el-switch
        active-text="新开店铺 "
        name="type"
        v-model="ruleForm.new"
      ></el-switch>
      <el-switch
        active-text="外卖保"
        name="type"
        v-model="ruleForm.bao"
      ></el-switch>
      <el-switch
        active-text="准时达 "
        name="type"
        v-model="ruleForm.zhun"
      ></el-switch>
      <el-switch
        active-text="开发票 "
        name="type"
        v-model="ruleForm.piao"
      ></el-switch>
    </el-form-item>
    <el-form-item label="配送费">
      <el-input-number
        v-model="ruleForm.float_delivery_fee"
        :min="0"
        :max="100"
        label="描述文字"
      ></el-input-number>
    </el-form-item>
    <el-form-item label="起送费">
      <el-input-number
        v-model="ruleForm.float_minimum_order_amount"
        :min="0"
        :max="100"
        label="描述文字"
      ></el-input-number>
    </el-form-item>
    <el-form-item label="营业时间">
      <el-time-select
        placeholder="起始时间"
        v-model="ruleForm.startTime"
        :picker-options="{
          start: '08:30',
          step: '00:15',
          end: '18:30',
        }"
      >
      </el-time-select>
      &nbsp; &nbsp;
      <el-time-select
        placeholder="结束时间"
        v-model="ruleForm.endTime"
        :picker-options="{
          start: '08:30',
          step: '00:15',
          end: '18:30',
          minTime: ruleForm.startTime,
        }"
      >
      </el-time-select>
    </el-form-item>

    <el-form-item label="上传店铺头像">
      <el-upload
        class="avatar-uploader"
        :action="uploadUrl"
        :show-file-list="true"
        :on-success="afterUpload_1"
      >
        <img
          v-if="ruleForm.image_path"
          :src="ruleForm.image_path"
          class="avatar"
        />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="上传营业执照">
      <el-upload
        class="avatar-uploader"
        :action="uploadUrl"
        :show-file-list="true"
        :on-success="afterUpload_2"
      >
        <img
          v-if="ruleForm.business_license_image"
          :src="ruleForm.business_license_image"
          class="avatar"
        />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="上传餐饮服务许可证">
      <el-upload
        class="avatar-uploader"
        action="https://elm.cangdu.org/v1/addimg/shop"
        :show-file-list="true"
        :on-success="afterUpload_3"
      >
        <img
          v-if="ruleForm.catering_service_license_image"
          :src="ruleForm.catering_service_license_image"
          class="avatar"
        />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="优惠活动">
      <el-select
        v-model="ruleForm.activities"
        placeholder="请选择"
        @change="Add_activity"
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

    <el-form-item>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="icon_name" label="活动标题"> </el-table-column>
        <el-table-column prop="name" label="活动名称"> </el-table-column>
        <el-table-column prop="description" label="活动详情"> </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small"
            >
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')"
        >立即创建</el-button
      >
    </el-form-item>
  </el-form>
</template>
<script>
import { imgUrl } from '../../lib/util'
import { foodCategory, addShop, search_address } from '../../api/add_shop'
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      category: '',
      categoryOptions: [],
      ruleForm: {
        name: '',
        phone: '',
        latitude: '',
        longitude: '',
        description: '',
        promotion_info: '',
        startTime: '',
        endTime: '',
        is_premium: false,
        delivery_mode: false,
        new: false,
        bao: false,
        zhun: false,
        piao: false,
        float_minimum_order_amount: 5,
        float_delivery_fee: 5,
      },
      // 活动
      options: [
        {
          value: '满减优惠',
          label: '满减优惠',
        },
        {
          value: '优惠大酬宾',
          label: '优惠大酬宾',
        },
        {
          value: '新用户立减',
          label: '新用户立减',
        },
        {
          value: '进店领券',
          label: '进店领券',
        },
      ],
      value: '',
      // 规则
      rules: {
        name: [
          {
            type: 'string',
            required: true,
            message: '请输入店铺名称',
            trigger: 'blur',
          },
          { min: 2, max: 10, message: '长度在 2 到 10个字符', trigger: 'blur' },
        ],
        address: [
          {
            type: 'string',
            required: true,
            message: '请输入地址',
            trigger: 'blur',
          },
        ],
        phone: [
          { required: true, message: '请输入联系电话' },
          { type: 'number', message: '电话必须为数字值' },
        ],
        description: [
          {
            type: 'string',
            required: true,
            message: '请输入内容',
            trigger: 'blur',
          },
        ],
        // trait: [
        //   {
        //     type: 'string',
        //     required: true,
        //     message: '请至少选择一个店铺特点',
        //     trigger: 'change',
        //   },
        // ],
      },
      restaurants: [],
      timeout: null,
      tableData: [],
    }
  },
  computed: {
    ...mapState({
      cityInfo: (state) => state.cityInfo,
    }),
  },
  methods: {
    // 图片显示赋值
    afterUpload_1(res) {
      this.$set(this.ruleForm, 'image_path', imgUrl() + res.image_path)
    },
    afterUpload_2(res) {
      this.$set(
        this.ruleForm,
        'business_license_image',
        imgUrl() + res.image_path
      )
    },
    afterUpload_3(res) {
      this.$set(
        this.ruleForm,
        'catering_service_license_image',
        imgUrl() + res.image_path
      )
    },
    // 添加活动
    Add_activity(data) {
      var activity = {}
      this.$prompt('请输入活动详情', '友情提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
        .then(({ value }) => {
          activity.name = data
          switch (data) {
            case '满减优惠':
              activity.icon_name = '减'
              activity.description = value
              break
            case '优惠大酬宾':
              activity.icon_name = '特'
              activity.description = value
              break
            case '新用户立减':
              activity.icon_name = '新'
              activity.description = value
              break
            case '进店领券':
              activity.icon_name = '领'
              activity.description = value
              break
            default:
              break
          }
          this.tableData.push(activity)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入',
          })
        })
    },
    // 删除活动
    deleteRow(index, tableData) {
      this.tableData.splice(index, 1)
    },
    async submitForm(formName) {
      this.ruleForm.category = this.category
      this.ruleForm.activity = this.tableData
      const data = await addShop(this.ruleForm)
      console.log(data.data)
    },
    // 获取分类
    async getFoodCategory() {
      const category = await foodCategory()
      category.data.forEach((item) => {
        if (item.sub_categories.length) {
          const addValue = {
            value: item.name,
            label: item.name,
            children: [],
          }
          item.sub_categories.forEach((sub_categorty, index) => {
            if (index == 0) {
              return
            }
            addValue.children.push({
              value: sub_categorty.name,
              label: sub_categorty.name,
            })
          })
          this.categoryOptions.push(addValue)
        }
      })
    },

    async getAddress() {
      const data = await search_address(this.cityInfo.id, this.ruleForm.address)
      data.data.forEach((item) => {
        item.value = item.address
      })
      this.restaurants = data.data
    },
    // 远程搜索
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.getAddress()
        cb(results)
      }, 3000 * Math.random())
    },
    createStateFilter() {
      return (state) => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    handleSelect(item) {
      this.ruleForm.latitude = item.latitude
      this.ruleForm.longitude = item.longitude
      this.ruleForm.address = item.address
    },
  },
  mounted() {
    this.getFoodCategory()
  },
}
</script>
