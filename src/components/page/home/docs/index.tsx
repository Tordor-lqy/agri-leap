import { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  File,
  Folder,
  Plus,
  Trash2,
  Edit2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { SerializedEditorState } from "lexical"
import { Editor } from "@/components/blocks/editor-00/editor"

// 文件树数据结构
const initialFileTree = {
  id: "root",
  name: "根目录",
  type: "folder",
  children: [
    {
      id: "1",
      name: "项目文档",
      type: "folder",
      children: [
        {
          id: "1-1",
          name: "需求文档.txt",
          type: "file",
          content: "这是需求文档的内容...",
        },
        {
          id: "1-2",
          name: "设计文档.txt",
          type: "file",
          content: "这是设计文档的内容...",
        },
      ],
    },
    {
      id: "2",
      name: "代码",
      type: "folder",
      children: [
        {
          id: "2-1",
          name: "main.js",
          type: "file",
          content: "console.log('Hello World');",
        },
        {
          id: "2-2",
          name: "utils.js",
          type: "file",
          content: "export const helper = () => {};",
        },
      ],
    },
    {
      id: "3",
      name: "README.md",
      type: "file",
      content: "# 项目说明\n\n欢迎使用文件管理系统！",
    },
  ],
};

// 文件树节点组件
function TreeNode({
  node,
  level = 0,
  onSelect,
  selectedId,
  onDelete,
  onRename,
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(node.name);

  const handleRename = () => {
    if (editName.trim()) {
      onRename(node.id, editName);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleRename();
    } else if (e.key === "Escape") {
      setEditName(node.name);
      setIsEditing(false);
    }
  };

  return (
    <div>
      <div
        className={`flex items-center gap-1 px-2 py-1.5 hover:bg-accent cursor-pointer rounded-sm transition-colors ${
          selectedId === node.id ? "bg-accent" : ""
        }`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
      >
        {node.type === "folder" && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="p-0.5 hover:bg-accent-foreground/10 rounded"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        )}
        {node.type === "file" && <div className="w-5" />}

        <div
          onClick={() => node.type === "file" && onSelect(node)}
          className="flex items-center gap-2 flex-1 min-w-0"
        >
          {node.type === "folder" ? (
            <Folder className="w-4 h-4 flex-shrink-0 text-blue-500" />
          ) : (
            <File className="w-4 h-4 flex-shrink-0 text-gray-500" />
          )}

          {isEditing ? (
            <Input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onBlur={handleRename}
              onKeyDown={handleKeyDown}
              onClick={(e) => e.stopPropagation()}
              className="h-6 py-0 px-1 text-sm"
              autoFocus
            />
          ) : (
            <span className="text-sm truncate">{node.name}</span>
          )}
        </div>

        <div
          className="flex gap-1 opacity-0 group-hover:opacity-100"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className="p-1 hover:bg-accent-foreground/10 rounded"
          >
            <Edit2 className="w-3 h-3" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(node.id);
            }}
            className="p-1 hover:bg-red-100 rounded"
          >
            <Trash2 className="w-3 h-3 text-red-500" />
          </button>
        </div>
      </div>

      {node.type === "folder" && isExpanded && node.children && (
        <div>
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              onSelect={onSelect}
              selectedId={selectedId}
              onDelete={onDelete}
              onRename={onRename}
            />
          ))}
        </div>
      )}
    </div>
  );
}


const initialValue = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "Hello World 🚀",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
} as unknown as SerializedEditorState

export default function FileManagerPage() {
  const [fileTree, setFileTree] = useState(initialFileTree);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const [editorState, setEditorState] =
    useState<SerializedEditorState>(initialValue);

  const handleSelectFile = (file) => {
    setSelectedFile(file);
    setFileContent(file.content || "");
  };

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setFileContent(newContent);

    // 更新文件树中的内容
    if (selectedFile) {
      updateFileContent(fileTree, selectedFile.id, newContent);
    }
  };

  const updateFileContent = (node, fileId, content) => {
    if (node.id === fileId) {
      node.content = content;
      return true;
    }
    if (node.children) {
      for (let child of node.children) {
        if (updateFileContent(child, fileId, content)) {
          return true;
        }
      }
    }
    return false;
  };

  const deleteNode = (node, targetId) => {
    if (!node.children) return node;

    node.children = node.children.filter((child) => child.id !== targetId);
    node.children.forEach((child) => deleteNode(child, targetId));

    return node;
  };

  const handleDelete = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    const newTree = { ...fileTree };
    deleteNode(newTree, deleteId);
    setFileTree(newTree);

    if (selectedFile?.id === deleteId) {
      setSelectedFile(null);
      setFileContent("");
    }
    setDeleteId(null);
  };

  const renameNode = (node, targetId, newName) => {
    if (node.id === targetId) {
      node.name = newName;
      return true;
    }
    if (node.children) {
      for (let child of node.children) {
        if (renameNode(child, targetId, newName)) {
          return true;
        }
      }
    }
    return false;
  };

  const handleRename = (id, newName) => {
    const newTree = { ...fileTree };
    renameNode(newTree, id, newName);
    setFileTree(newTree);

    if (selectedFile?.id === id) {
      setSelectedFile({ ...selectedFile, name: newName });
    }
  };

  return (
    <div className="h-screen flex flex-col w-full">
      {/* 顶部工具栏 */}
      <div className="border-b px-4 py-3 bg-background">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">文件管理系统</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              新建文件
            </Button>
            <Button variant="outline" size="sm">
              <Folder className="w-4 h-4 mr-2" />
              新建文件夹
            </Button>
          </div>
        </div>
      </div>

      {/* 主内容区域 */}
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* 左侧文件树 */}
        <ResizablePanel defaultSize={25} minSize={15} maxSize={40}>
          <div className="h-full border-r bg-background overflow-auto">
            <div className="p-2">
              <div className="text-xs font-medium text-muted-foreground mb-2 px-2">
                文件浏览器
              </div>
              <div className="group">
                {fileTree.children?.map((node) => (
                  <TreeNode
                    key={node.id}
                    node={node}
                    onSelect={handleSelectFile}
                    selectedId={selectedFile?.id}
                    onDelete={handleDelete}
                    onRename={handleRename}
                  />
                ))}
              </div>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* 右侧内容编辑区 */}
        <ResizablePanel defaultSize={75}>
          <div className="h-full flex flex-col bg-background">
            {selectedFile ? (
              <>
                {/* 文件标题栏 */}
                <div className="border-b px-4 py-3">
                  <div className="flex items-center gap-2">
                    <File className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">{selectedFile.name}</span>
                  </div>
                </div>

                {/* 文本编辑器 */}
                <div className="flex-1 p-4 overflow-auto">
                  <Editor
                    editorSerializedState={editorState}
                    onSerializedChange={handleContentChange}
                    // value={fileContent}
                    // onChange={handleContentChange}
                    // className="w-full h-full p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring font-mono text-sm"
                    // placeholder="在此编辑文件内容..."
                  />
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <File className="w-16 h-16 mx-auto mb-4 opacity-20" />
                  <p>选择一个文件开始编辑</p>
                </div>
              </div>
            )}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      {/* 删除确认对话框 */}
      <AlertDialog
        open={deleteId !== null}
        onOpenChange={() => setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              你确定要删除这个项目吗？此操作无法撤销。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
