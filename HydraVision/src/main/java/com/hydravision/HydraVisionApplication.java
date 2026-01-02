package com.hydravision;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * HydraVision 智能降水检测预警系统
 * 主启动类
 */
@SpringBootApplication
@MapperScan("com.hydravision.mapper")
@EnableAsync
@EnableScheduling
public class HydraVisionApplication {

    public static void main(String[] args) {
        SpringApplication.run(HydraVisionApplication.class, args);
        System.out.println("====================================");
        System.out.println("  HydraVision 系统启动成功！");
        System.out.println("  API文档: http://localhost:8080/api/doc.html");
        System.out.println("====================================");
    }
}
