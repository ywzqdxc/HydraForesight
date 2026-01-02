package com.hydravision.mapper.report;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.hydravision.entity.report.PublicReport;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

/**
 * 公众上报Mapper接口
 */
@Mapper
public interface PublicReportMapper extends BaseMapper<PublicReport> {

    /**
     * 统计各类型上报数量
     */
    @Select("SELECT report_type as reportType, COUNT(*) as count FROM hf_public_report WHERE is_deleted = 0 GROUP BY report_type")
    List<Map<String, Object>> countByType();

    /**
     * 统计各处理状态上报数量
     */
    @Select("SELECT process_status as processStatus, COUNT(*) as count FROM hf_public_report WHERE is_deleted = 0 GROUP BY process_status")
    List<Map<String, Object>> countByProcessStatus();

    /**
     * 获取最新上报列表
     */
    @Select("SELECT * FROM hf_public_report WHERE is_deleted = 0 ORDER BY create_time DESC LIMIT #{limit}")
    List<PublicReport> selectLatestReports(@Param("limit") Integer limit);

    /**
     * 分页查询上报记录
     */
    IPage<PublicReport> selectReportPage(Page<PublicReport> page, @Param("query") Map<String, Object> query);
}
