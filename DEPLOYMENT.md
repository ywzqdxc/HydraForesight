# HydraVision 系统部署指南

## 服务器要求
- **操作系统**: Ubuntu 22.04 64位
- **配置**: 2核2GB（最低配置）
- **推荐配置**: 4核8GB（生产环境）

## 一、环境准备

### 1.1 连接到服务器
通过阿里云Workbench或SSH连接到服务器后，首先更新系统：

```bash
# 更新软件包列表
sudo apt update
sudo apt upgrade -y
```

### 1.2 安装Java环境（后端需要）

```bash
# 安装OpenJDK 17
sudo apt install openjdk-17-jdk -y

# 验证安装
java -version
```

### 1.3 安装Node.js和npm（前端需要）

```bash
# 安装Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 验证安装
node -v
npm -v

# 安装pnpm（可选，更快）
sudo npm install -g pnpm
```

### 1.4 安装MySQL数据库

```bash
# 安装MySQL 8.0
sudo apt install mysql-server -y

# 启动MySQL服务
sudo systemctl start mysql
sudo systemctl enable mysql

# 安全配置（设置root密码等）
sudo mysql_secure_installation
```

按照提示：
- 设置root密码（记住这个密码）
- 移除匿名用户：Y
- 禁止root远程登录：Y
- 移除测试数据库：Y
- 重新加载权限表：Y

### 1.5 安装Nginx（Web服务器和反向代理）

```bash
# 安装Nginx
sudo apt install nginx -y

# 启动Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# 检查状态
sudo systemctl status nginx
```

### 1.6 安装Git

```bash
sudo apt install git -y
```

## 二、数据库配置

### 2.1 登录MySQL并创建数据库

```bash
# 登录MySQL
sudo mysql -u root -p
```

在MySQL命令行中执行：

```sql
-- 创建数据库
CREATE DATABASE hydravision DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 创建应用用户
CREATE USER 'hydravision'@'localhost' IDENTIFIED BY 'Qwertyuiop@520';

-- 授予权限
GRANT ALL PRIVILEGES ON hydravision.* TO 'hydravision'@'localhost';

-- 刷新权限
FLUSH PRIVILEGES;

-- 退出
EXIT;
```


### 2.2 导入数据库脚本

```bash
# 上传SQL脚本到服务器（如果有初始化脚本）
# 然后执行：
mysql -u root  < /home/init.sql
```

## 三、部署后端应用

### 3.1 创建应用目录

```bash
# 创建应用目录
sudo mkdir -p /opt/hydravision
sudo chown admin /opt/hydravision
cd /opt/hydravision
```

### 3.2 上传或克隆代码

**方法1：使用Git（推荐）**
```bash
cd /opt/hydravision
git clone <your-git-repository-url>
cd HydraVision
```

**方法2：手动上传**
- 在本地打包项目为zip
- 使用Workbench上传到服务器
- 解压：`unzip HydraVision.zip`

### 3.3 配置后端application.yml

```bash
cd /opt/hydravision/HydraVision/src/main/resources
nano application.yml
```

修改以下配置：

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/hydravision?useUnicode=true&characterEncoding=utf8&useSSL=false&serverTimezone=Asia/Shanghai
    username: hydravision
    password: your_strong_password_here  # 改为你设置的密码
    driver-class-name: com.mysql.cj.jdbc.Driver

  # 文件上传配置
  servlet:
    multipart:
      max-file-size: 100MB
      max-request-size: 100MB

# 文件存储路径（确保目录存在）
file:
  upload-dir: /opt/hydravision/uploads

# 服务器配置
server:
  port: 8080
```

### 3.4 创建上传目录

```bash
mkdir -p /opt/hydravision/uploads
chmod 755 /opt/hydravision/uploads
```

### 3.5 构建后端应用

```bash
cd /opt/hydravision

# 如果本地有Maven
./mvnw clean package -DskipTests

# 或使用系统Maven（需先安装）
# sudo apt install maven -y
# mvn clean package -DskipTests
```

构建完成后，会在 `target/` 目录生成 `HydraVision-0.0.1-SNAPSHOT.jar`

### 3.6 创建后端系统服务

```bash
sudo vi /etc/systemd/system/hydravision-backend.service
```

添加以下内容：

```ini
[Unit]
Description=HydraVision Backend Service
After=mysql.service

[Service]
Type=simple
User=root
WorkingDirectory=/opt/hydravision
ExecStart=/usr/bin/java -jar /opt/hydravision/hydra-vision-1.0.0-SNAPSHOT.jar
Restart=on-failure
RestartSec=10
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```

启动后端服务：

```bash
# 重新加载systemd
sudo systemctl daemon-reload

# 启动服务
sudo systemctl start hydravision-backend

# 设置开机自启
sudo systemctl enable hydravision-backend

# 检查状态
sudo systemctl status hydravision-backend

# 查看日志
sudo journalctl -u hydravision-backend -f
```

## 四、部署前端应用

### 4.1 安装前端依赖

```bash
cd /opt/hydravision
npm install
# 或使用pnpm: pnpm install
```
### 4.3 构建前端应用

```bash
cd /opt/hydravision
npm run build
# 或: pnpm build
```

### 4.4 创建前端系统服务

```bash
sudo nano /etc/systemd/system/hydravision-frontend.service
```

添加以下内容：

```ini
[Unit]
Description=HydraVision Frontend Service
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/HydraForesight
ExecStart=/usr/bin/npm start
Restart=on-failure
RestartSec=10
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```

启动前端服务：

```bash
# 重新加载systemd
sudo systemctl daemon-reload

# 启动服务
sudo systemctl start hydravision-frontend

# 设置开机自启
sudo systemctl enable hydravision-frontend

# 检查状态
sudo systemctl status hydravision-frontend
```

## 五、配置Nginx反向代理

### 5.1 创建Nginx配置文件

```bash
sudo nano /etc/nginx/sites-available/hydravision
```

添加以下内容：

```nginx
server {
    listen 80;
    server_name 47.93.253.19;  # 改为你的域名或服务器IP

    client_max_body_size 100M;

    # 前端代理
    location / {
        proxy_pass http://localhost:9001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # 后端API代理
    location /api/ {
        proxy_pass http://localhost:8080/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # 文件上传端点
    location /file/ {
        proxy_pass http://localhost:8080/file/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # 静态文件（上传的文件）
    location /uploads/ {
        alias /opt/hydravision/uploads/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

### 5.1 创建Nginx配置文件
```nginx
server {
    listen 80;
    server_name 47.93.253.19;

    client_max_body_size 100M;

    # 前端代理（包括Next.js API路由如 /api/chat, /api/weather）
    location / {
        proxy_pass http://localhost:9001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Next.js API路由 - 由前端处理（chat和weather）
    location /api/chat {
        proxy_pass http://localhost:9001/api/chat;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /api/weather {
        proxy_pass http://localhost:9001/api/weather;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Spring Boot后端API代理（其他/api/请求）
    location /api/ {
        proxy_pass http://localhost:8080/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # 文件上传端点
    location /file/ {
        proxy_pass http://localhost:8080/file/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # 静态文件（上传的文件）
    location /uploads/ {
        alias /opt/hydravision/uploads/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

### 5.2 启用站点配置

```bash
# 创建符号链接
sudo ln -s /etc/nginx/sites-available/hydravision /etc/nginx/sites-enabled/

# 删除默认站点（可选）
sudo rm /etc/nginx/sites-enabled/default

# 测试配置
sudo nginx -t

# 重启Nginx
sudo systemctl restart nginx
```

## 六、配置防火墙

### 6.1 配置UFW防火墙

```bash
# 启用UFW
sudo ufw enable

# 允许SSH（重要！）
sudo ufw allow 22/tcp

# 允许HTTP
sudo ufw allow 80/tcp

# 允许HTTPS（如果配置SSL）
sudo ufw allow 443/tcp

# 查看状态
sudo ufw status
```

### 6.2 阿里云安全组配置

在阿里云控制台配置安全组规则：
- 入方向：允许 80 端口（HTTP）
- 入方向：允许 443 端口（HTTPS）
- 入方向：允许 22 端口（SSH）

## 七、配置SSL证书（可选但推荐）

### 7.1 安装Certbot

```bash
sudo apt install certbot python3-certbot-nginx -y
```

### 7.2 获取SSL证书

```bash
# 自动配置Nginx和SSL
sudo certbot --nginx -d your_domain.com

# 或手动指定邮箱
sudo certbot --nginx -d your_domain.com --email your_email@example.com --agree-tos
```

### 7.3 自动续期

```bash
# 测试自动续期
sudo certbot renew --dry-run

# Certbot会自动添加续期任务到cron
```

## 八、验证部署

### 8.1 检查服务状态

```bash
# 检查后端
sudo systemctl status hydravision-backend

# 检查前端
sudo systemctl status hydravision-frontend

# 检查Nginx
sudo systemctl status nginx

# 检查MySQL
sudo systemctl status mysql
```

### 8.2 查看日志

```bash
# 后端日志
sudo journalctl -u hydravision-backend -f

# 前端日志
sudo journalctl -u hydravision-frontend -f

# Nginx日志
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### 8.3 测试访问

```bash
# 测试后端API
curl http://localhost:8080/api/health

# 在浏览器访问
http://your_server_ip
# 或
https://your_domain.com
```

## 九、维护和监控

### 9.1 常用命令

```bash
# 重启后端
sudo systemctl restart hydravision-backend

# 重启前端
sudo systemctl restart hydravision-frontend

# 重启Nginx
sudo systemctl restart nginx

# 查看系统资源使用
htop
# 或
top

# 查看磁盘使用
df -h

# 清理日志（如果日志过大）
sudo journalctl --vacuum-time=7d
```

### 9.2 备份策略

```bash
# 创建备份脚本
sudo nano /opt/hydravision/backup.sh
```

添加内容：

```bash
#!/bin/bash
BACKUP_DIR="/opt/hydravision/backups"
DATE=$(date +%Y%m%d_%H%M%S)

# 创建备份目录
mkdir -p $BACKUP_DIR

# 备份数据库
mysqldump -u hydravision -p'your_password' hydravision > $BACKUP_DIR/db_$DATE.sql

# 备份上传文件
tar -czf $BACKUP_DIR/uploads_$DATE.tar.gz /opt/hydravision/uploads

# 删除30天前的备份
find $BACKUP_DIR -name "*.sql" -mtime +30 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +30 -delete

echo "Backup completed: $DATE"
```

设置定时任务：

```bash
# 添加可执行权限
chmod +x /opt/hydravision/backup.sh

# 编辑crontab
crontab -e

# 添加每天凌晨2点自动备份
0 2 * * * /opt/hydravision/backup.sh >> /opt/hydravision/backup.log 2>&1
```

## 十、故障排查

### 10.1 后端无法启动

```bash
# 查看详细日志
sudo journalctl -u hydravision-backend -n 100 --no-pager

# 检查端口占用
sudo netstat -tulpn | grep 8080

# 检查数据库连接
mysql -u hydravision -p hydravision -e "SELECT 1"
```

### 10.2 前端无法访问

```bash
# 检查前端服务
sudo systemctl status hydravision-frontend

# 检查端口
sudo netstat -tulpn | grep 3000

# 检查Nginx配置
sudo nginx -t
```

### 10.3 文件上传失败

```bash
# 检查上传目录权限
ls -la /opt/hydravision/uploads

# 确保目录可写
sudo chmod 755 /opt/hydravision/uploads
sudo chown -R ubuntu:ubuntu /opt/hydravision/uploads
```

### 10.4 性能优化（2GB内存）

由于服务器只有2GB内存，需要优化JVM参数：

```bash
# 编辑后端服务
sudo nano /etc/systemd/system/hydravision-backend.service
```

修改ExecStart行：

```ini
ExecStart=/usr/bin/java -Xms512m -Xmx1024m -jar /opt/hydravision/HydraVision/target/HydraVision-0.0.1-SNAPSHOT.jar
```

重启服务：

```bash
sudo systemctl daemon-reload
sudo systemctl restart hydravision-backend
```

## 十一、更新部署

### 11.1 更新后端

```bash
# 停止服务
sudo systemctl stop hydravision-backend

# 拉取最新代码
cd /opt/hydravision/HydraVision
git pull

# 重新构建
./mvnw clean package -DskipTests

# 启动服务
sudo systemctl start hydravision-backend
```

### 11.2 更新前端

```bash
# 停止服务
sudo systemctl stop hydravision-frontend

# 拉取最新代码
cd /opt/hydravision
git pull

# 重新安装依赖（如果package.json有变化）
npm install

# 重新构建
npm run build

# 启动服务
sudo systemctl start hydravision-frontend
```

## 十二、安全建议

1. **定期更新系统**: `sudo apt update && sudo apt upgrade -y`
2. **使用强密码**: 数据库、SSH等都使用强密码
3. **禁用root SSH登录**: 编辑 `/etc/ssh/sshd_config`，设置 `PermitRootLogin no`
4. **配置fail2ban**: 防止暴力破解
5. **定期备份**: 数据库和文件
6. **监控日志**: 定期检查异常访问
7. **使用HTTPS**: 生产环境必须使用SSL证书

## 快速部署脚本

创建一键部署脚本 `deploy.sh`：

```bash
#!/bin/bash
set -e

echo "=== HydraVision 快速部署脚本 ==="

# 颜色输出
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}1. 更新系统...${NC}"
sudo apt update && sudo apt upgrade -y

echo -e "${GREEN}2. 安装Java 17...${NC}"
sudo apt install openjdk-17-jdk -y

echo -e "${GREEN}3. 安装Node.js...${NC}"
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

echo -e "${GREEN}4. 安装MySQL...${NC}"
sudo apt install mysql-server -y

echo -e "${GREEN}5. 安装Nginx...${NC}"
sudo apt install nginx -y

echo -e "${GREEN}6. 安装Git...${NC}"
sudo apt install git -y

echo -e "${GREEN}部署完成！${NC}"
echo "请按照文档继续配置数据库和应用..."
```

使用方法：

```bash
chmod +x deploy.sh
./deploy.sh
```

---

