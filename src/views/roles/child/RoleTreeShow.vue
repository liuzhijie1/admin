<template>
  <div class="row-tree-show">
    <el-row v-for="item in roleinfo" :key="item.id" class="every">
      <el-col :span="4">
        <el-tag closable type="primary" @close="deleteRole(item.id)">
          {{ item.authName }}
        </el-tag>
        <i class="el-icon-caret-right"></i>
      </el-col>
      <el-col :span="20">
        <el-row v-for="item1 in item.children" :key="item1.id">
          <el-col :span="4">
            <el-tag closable type="success" @close="deleteRole(item1.id)">
              {{ item1.authName }}
            </el-tag>
            <i class="el-icon-caret-right"></i>
          </el-col>
          <el-col :span="20">
            <el-tag
              closable
              type="warning"
              v-for="item11 in item1.children"
              :key="item11.id"
              @close="deleteRole(item11.id)"
            >
              {{ item11.authName }}
            </el-tag>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { deleteUserRight } from "network/api";
import { isOk } from "utils/common.js";
export default {
  props: {
    showTree: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      roleinfo: this.showTree.children,
    };
  },
  methods: {
    deleteRole(id) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const data = await deleteUserRight(this.showTree.id, id);
          this.roleinfo = data.data;
          // this.showTree = data.data;
          this.$emit('changAllot',this.showTree.id,data.data);
          // this.$emit('hasChanged');
          isOk(this, data.meta);
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped>
.every {
  margin: 10px 0;
}
.el-row {
  display: flex;
  align-items: center;
  /* margin: 10px 0; */
  border-bottom: 1px solid #eee;
  border-top: 1px solid #eee;
}
.el-tag {
  margin: 10px 10px;
}
</style>
