package com.hydravision.service.common;

import com.hydravision.common.exception.BusinessException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * 文件上传服务
 */
@Service
public class FileUploadService {

    @Value("${file.upload.path:./uploads}")
    private String uploadPath;

    @Value("${file.upload.max-size:10485760}")
    private long maxSize;

    @Value("${file.upload.allowed-types:jpg,jpeg,png,gif,pdf,doc,docx}")
    private String allowedTypes;

    @Value("${file.upload.url-prefix:http://127.0.0.1:8080/api}")
    private String urlPrefix;

    /**
     * 上传文件
     * @param file 文件
     * @param subDir 子目录（如：alert-response）
     * @return 文件信息Map（包含id, name, url, size, type, path）
     */
    public Map<String, Object> uploadFile(MultipartFile file, String subDir) {
        if (file == null || file.isEmpty()) {
            throw new BusinessException("上传文件不能为空");
        }

        // 检查文件大小
        if (file.getSize() > maxSize) {
            throw new BusinessException("文件大小超过限制（最大" + (maxSize / 1024 / 1024) + "MB）");
        }

        // 检查文件类型
        String originalFilename = file.getOriginalFilename();
        String extension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf(".") + 1).toLowerCase();
        }

        if (!isAllowedType(extension)) {
            throw new BusinessException("不支持的文件类型: " + extension);
        }

        LocalDateTime now = LocalDateTime.now();
        String dateDir = now.format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
        String timeStamp = now.format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        
        // 生成唯一文件名：原文件名_时间戳_随机码.扩展名
        String randomCode = UUID.randomUUID().toString().substring(0, 4).toUpperCase();
        String baseFileName = originalFilename != null ? 
            originalFilename.substring(0, originalFilename.lastIndexOf(".")) : "file";
        String fileName = baseFileName + "_" + timeStamp + randomCode + "." + extension;
        
        String relativePath = subDir + "/" + dateDir + "/" + fileName;

        try {
            Path targetPath = Paths.get(uploadPath, relativePath);
            Files.createDirectories(targetPath.getParent());
            Files.copy(file.getInputStream(), targetPath);

            Map<String, Object> result = new HashMap<>();
            result.put("id", System.currentTimeMillis() + "_" + randomCode.hashCode());
            result.put("name", originalFilename);
            result.put("url", urlPrefix + "/file/download?filePath=" + relativePath);
            result.put("size", file.getSize());
            result.put("type", file.getContentType() != null ? file.getContentType() : "application/octet-stream");
            result.put("path", targetPath.toString());

            return result;
        } catch (IOException e) {
            throw new BusinessException("文件上传失败: " + e.getMessage());
        }
    }

    /**
     * 删除文件
     */
    public void deleteFile(String relativePath) {
        if (relativePath == null || relativePath.isEmpty()) {
            return;
        }
        try {
            Path targetPath = Paths.get(uploadPath, relativePath);
            Files.deleteIfExists(targetPath);
        } catch (IOException e) {
            // 删除失败不抛出异常
        }
    }

    private boolean isAllowedType(String extension) {
        if (extension == null || extension.isEmpty()) {
            return false;
        }
        String[] types = allowedTypes.split(",");
        for (String type : types) {
            if (type.trim().equalsIgnoreCase(extension)) {
                return true;
            }
        }
        return false;
    }
}
