<template>
  <div class="list-container">
    <h1>列表</h1>
    <p class="btn-line">
      <a-button type="primary" @click="addNew">添加</a-button>
    </p>

    <a-modal
      v-model:visible="showAdd"
      :title="form.id ? '修改' : '添加'"
      @ok="addOk"
    >
      <a-form ref="addFroms" :model="form" :rules="rule">
        <a-form-item label="名称" name="name">
          <a-input v-model:value="form.name" placeholder="名称"></a-input>
        </a-form-item>
        <a-form-item label="上传文件" name="code_url">
          <a-upload
            @change="fileChange"
            :action="uploadUrl"
            :headers="headers"
            :file-list="fileList"
          >
            <a-button v-if="!form.code_url">上传文件</a-button>
          </a-upload>
        </a-form-item>

        <a-form-item label="备注" name="remark">
          <a-input
            v-model:value="form.remark"
            placeholder="或者点击右侧随机生成"
          >
          </a-input>
        </a-form-item>
      </a-form>
    </a-modal>

    <a-table :columns="columns" :data-source="list">
      <template #handler="{ record }">
        <a-popconfirm @confirm="deleteIt(record)" title="您确定删除该文件吗？">
          <a-button type="link">删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>

<script>
import { message } from "ant-design-vue";
import { onMounted, reactive, ref, toRefs } from "vue";
import { getFileList,addFiles } from "@/api/list";
import { getToken } from "@/utils/util";

export default {
  name: "Index",
  setup() {
    const datas = reactive({
      url: "",
      page: 1,
      pageSize: 20,
      list: [],
      form: {},
      columns: [
        { title: "名称", dataIndex: "name" },
        { title: "页面地址", dataIndex: "page_url" },
        { title: "二维码链接", dataIndex: "code_url" },
        { title: "备注", dataIndex: "remark" },
        { title: "创建时间", dataIndex: "create_time" },
        { title: "操作", slots: { customRender: "handler" } },
      ],
      rule: {},
    });
    onMounted(() => {
      getList();
    });
    // 添加弹窗
    const showAdd = ref(false);
    const addFroms = ref(null);

    const addNew = () => {
      showAdd.value = !showAdd.value;
    };

    const addOk = async () => {
      try {
        // console.log("ss");
        await addFroms.value.validate();
        console.log(datas.form);
        await addFiles(datas.form)
        getList()
        addNew()
        message.success('添加成功')
      } catch (error) {
        message.error(error.msg || "添加失败");
      }
    };

    const getList = async () => {
      const params = {
        page: datas.page,
        pageSize: datas.pageSize,
      };
      try {
        const list = await getFileList(params);
        // console.log(list)
        datas.list = list.data;
      } catch (error) {
        message.error(error.msg || "获取列表失败");
      }
    };

    const files = reactive({
      fileList: [],
      headers: {
        // "Content-Type": "multipart/form-data",
        "Accept": "*/*",
        Authorization: getToken(),
      },
      uploadUrl: "http://localhost:5000/upload",
    });
    const fileChange = (e) => {
      console.log('文件回调',e)
      if (e.file.status === "done") {
        datas.form.code_url = e.file.response.data || null;
      }
      if (e.file.status === "remove") {
        datas.form.icon = null;
      }
      files.fileList = e.fileList;
    };
    return {
      ...toRefs(datas),
      addOk,
      showAdd,
      addFroms,
      addNew,
      fileChange,
      ...toRefs(files),
    };
  },
};
</script>

<style scoped>
.list-container {
  width: 80%;
  margin-left: 10%;
}
</style>