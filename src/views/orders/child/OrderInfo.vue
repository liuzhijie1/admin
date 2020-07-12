<template>
  <div class="order-info">
    <el-dialog
      title="物流进度"
      :visible="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :timestamp="activity.time"
        >
          {{ activity.context }}
        </el-timeline-item>
      </el-timeline>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    activities: {
      type: Array,
    },
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
      handleClose() {
          this.dialogVisible = false;
      }
  },
};
</script>

<style scoped>
.el-timeline{
  font-size: 12px;
}
</style>
