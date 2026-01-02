package com.hydravision.common.base;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.io.Serializable;

/**
 * 分页查询基类
 */
@Data
public class BasePageQuery implements Serializable {

    private static final long serialVersionUID = 1L;

    @Schema(description = "当前页码", example = "1")
    private Long current = 1L;

    @Schema(description = "每页数量", example = "10")
    private Long size = 10L;

    @Schema(description = "排序字段")
    private String orderBy;

    @Schema(description = "排序方式: asc/desc")
    private String orderDirection = "desc";

    /**
     * 获取偏移量
     */
    public Long getOffset() {
        return (current - 1) * size;
    }
}
