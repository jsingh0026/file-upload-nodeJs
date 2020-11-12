# File-Upload API in nodeJS

**Overview**

This is a Profile application where you can add or retrieve members name with their respective profile images

**Getting Started**

Clone the repo:
```
git clone https://github.com/jsingh0026/file-upload-nodeJs.git
cd file-upload-nodeJs
```

# Docker
**Building and running without Docker Compose**
```
# Build docker
docker build -t node-app .

# Run docker
docker run -p 3000:3000 node-app
```
**Endpoints**

- To get all member details
`http://localhost:3000/members`
- Upload image files
`http://localhost:3000/uploads`

**To verify**
`check /uploads folder for your files`
