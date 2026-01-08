package com.hydravision.controller.common;

import com.hydravision.common.result.Result;
import com.hydravision.service.common.FileUploadService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;

/**
 * 文件上传控制器
 */
@Tag(name = "文件上传", description = "文件上传相关接口")
@RestController
@RequestMapping("/file")
@RequiredArgsConstructor
public class FileUploadController {

    private final FileUploadService fileUploadService;

    @Value("${file.upload.path:./uploads}")
    private String uploadPath;

    @Operation(summary = "上传文件")
    @PostMapping("/upload")
    public Result<Map<String, Object>> uploadFile(
            @Parameter(description = "文件") @RequestParam("file") MultipartFile file,
            @Parameter(description = "子目录") @RequestParam(defaultValue = "common") String subDir) {
        return Result.success(fileUploadService.uploadFile(file, subDir));
    }

    @Operation(summary = "上传预警响应附件")
    @PostMapping("/upload/alert-response")
    public Result<Map<String, Object>> uploadAlertResponseFile(
            @Parameter(description = "文件") @RequestParam("file") MultipartFile file) {
        return Result.success(fileUploadService.uploadFile(file, "alert-response"));
    }

    @Operation(summary = "下载文件")
    @GetMapping("/download")
    public ResponseEntity<Resource> downloadFile(@Parameter(description = "文件路径") @RequestParam String filePath) {
        try {
            Path path = Paths.get(uploadPath).resolve(filePath).normalize();
            Resource resource = new UrlResource(path.toUri());

            if (resource.exists() && resource.isReadable()) {
                String contentType = "application/octet-stream";
                // 尝试根据文件扩展名确定Content-Type
                String filename = resource.getFilename();
                if (filename != null) {
                    if (filename.endsWith(".pdf")) contentType = "application/pdf";
                    else if (filename.endsWith(".jpg") || filename.endsWith(".jpeg")) contentType = "image/jpeg";
                    else if (filename.endsWith(".png")) contentType = "image/png";
                }
                
                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType))
                        .header(HttpHeaders.CONTENT_DISPOSITION, 
                                "attachment; filename=\"" + new String(resource.getFilename().getBytes("UTF-8"), "ISO-8859-1") + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @Operation(summary = "删除文件")
    @DeleteMapping("/delete")
    public Result<Void> deleteFile(@Parameter(description = "文件路径") @RequestParam String filePath) {
        fileUploadService.deleteFile(filePath);
        return Result.success();
    }
}
