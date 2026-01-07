package com.hydravision.mapper.report;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.hydravision.entity.report.ReportProcess;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * 上报处理记录Mapper
 */
@Mapper
public interface ReportProcessMapper extends BaseMapper<ReportProcess> {

    /**
     * 根据上报ID查询处理记录
     */
    @Select("SELECT * FROM hf_report_process WHERE report_id = #{reportId} ORDER BY process_time DESC")
    List<ReportProcess> selectByReportId(Long reportId);
}
