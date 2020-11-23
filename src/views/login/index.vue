<template>
  <div class="container">
    <div class="row">
      <div class="m-auto col-lg-4 col-md-6 col-sm-9 col-12 pt-5">
        <div class="card mt-5">
          <div class="card-header bg-white text-center text-secondary">
            <h3 class="mb-0">{{ $config.logo }}</h3>
          </div>
          <div class="card-body">
            <el-form ref="form" :rules="rules" :model="form">
              <el-form-item prop="username">
                <el-input
                  size="medium"
                  v-model="form.username"
                  placeholder="请输入账号"
                />
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  size="medium"
                  type="password"
                  v-model="form.password"
                  placeholder="请输入密码"
                />
              </el-form-item>
              <el-form-item>
                <el-button
                  @click="submit"
                  size="medium"
                  style="width:100%"
                  type="primary"
                  >立即登录</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 10, message: "密码长度6-10位", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate((e) => {
        if (!e) return;
        this.$router.push("/index");
      });
    },
  },
};
</script>

<style></style>
