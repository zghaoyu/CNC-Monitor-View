<template>
  <div>
    <el-card class="box-card">
      <h2>登录</h2>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-position="left"
        label-width="70px"
        class="login-from"
      >
        <el-form-item label="用户名" prop="uname">
          <el-input v-model="ruleForm.uname"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="btnGroup">
        <el-button type="primary" @click="submitForm('ruleForm')"
          >登录</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <router-link to="/register">
          <el-button style="margin-left: 10px">注册</el-button>
        </router-link>
      </div>
    </el-card>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      ruleForm: {
        uname: "",
        password: "",
        token: "",
      },
      rules: {
        uname: [
          { required: true, message: "用户名不能为空！", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空！", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async login() {
      const formData = new FormData();
      formData.append("username", this.ruleForm.uname);
      formData.append("password", this.ruleForm.password);
      let result = await this.$axios
        .post("http://localhost:8080/user/login", formData)
        .then(function (response) {
          alert(response.data.msg);          
          return response;
        })
        .catch(function (error) {
          alert("login fail");
          console.log(error);
        });
      console.log(result.data.data)
      if (result.data.code == 200) {
        this.$emit("changeLoginComponentShow");
        localStorage.setItem("token",response.data);
        console.log(response.data);
      }
    },
  },
};
</script>
  
  <style scoped>
.box-card {
  margin: auto auto;
  width: 400px;
}
.login-from {
  margin: auto auto;
}
</style>